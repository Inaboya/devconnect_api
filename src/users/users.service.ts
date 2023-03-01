import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validateRegisterInput } from 'src/utils/validateAuth';
import { CreateUserDTO } from './dto/create-users-dto';
import { UserInterface } from './interface/user-interface';
import normalize from 'normalize-url';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async registerUser(payload: CreateUserDTO) {
    try {
      const { errors } = validateRegisterInput(payload);

      if (errors) {
        throw new Error(errors as any);
      }

      const { name, email, password } = payload;

      const user = await this.userModel.findOne({ email });

      if (user) {
        throw new Error('User already exists');
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        }),
        { forceHttps: true },
      );

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = new this.userModel({
        name,
        email,
        password: hash,
        avatar,
      });

      await newUser.save();

      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
