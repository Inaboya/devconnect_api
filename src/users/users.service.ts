import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  validateRegisterInput,
  validateLoginInput,
} from 'src/utils/validateAuth';
import { CreateUserDTO } from './dto/create-users-dto';
import { UserInterface } from './interface/user-interface';
// import * as normalizeUrl from 'normalize-url';
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcryptjs';
import { normalizeUrl } from 'src/utils/normalize-url';
import { LoginUserDTO } from './dto/login-users-dto';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/contants';
// import config from 'config';
// import { config } from 'dotenv';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(payload: CreateUserDTO) {
    try {
      const errors = validateRegisterInput(payload);

      if (errors.isValid === false) {
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, errors },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const { name, email, password } = payload;

        const user = await this.userModel.findOne({ email });

        if (user) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              errors: 'User already exists',
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        const avatar = normalizeUrl(
          gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
          }),
        );

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new this.userModel({
          name,
          email,
          password: hash,
          avatar,
        });

        const createdUser = await newUser.save();

        return createdUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser(payload: LoginUserDTO) {
    const errors = validateLoginInput(payload);
    try {
      if (errors.isValid === false) {
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, errors },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const { email, password } = payload;

        const user = await this.userModel.findOne({ email });

        if (!user) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              errors: 'Invalid credentials',
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              errors: 'Invalid credentials',
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        const jwtPayload = {
          id: user.id,
        };

        const token = this.jwtService.sign(jwtPayload, {
          secret: JWT_SECRET,
        });

        return {
          data: user,
          token,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getUser(id: string) {
    try {
      const user = await this.userModel
        .findById({ _id: id })
        .select('-password');

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'User does not exist',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
