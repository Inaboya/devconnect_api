import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { normalizeUrl } from 'src/utils/normalize-url';
import { validateProfileInputs } from 'src/utils/validateProfileInputs';
import { CreateProfileDTO } from './dto/create-profile-dto';
import { ProfileInterface } from './interface/profile-interface';

interface ProfileFields {
  user: string;
  website: string;
  skills: string[];
  company: string;
  location: string;
  status: string;
  social?: {
    youtube: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  bio: string;
}

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile')
    private readonly profileModel: Model<ProfileInterface>,
  ) {}

  async createProfile(payload: CreateProfileDTO, user: string) {
    const errors = validateProfileInputs(payload);

    try {
      if (errors.isValid === false) {
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, errors },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const {
          website,
          company,
          location,
          skills,
          bio,
          status,
          twitter,
          facebook,
          linkedin,
          youtube,
          instagram,
        } = payload;

        try {
          const profileFields: ProfileFields = {
            user,
            website: website && website !== '' ? normalizeUrl(website) : '',
            skills: Array.isArray(skills)
              ? skills
              : // @ts-ignore
                skills.split(',').map((skill: string) => ' ' + skill.trim()),
            company: company && company !== '' ? company : '',
            location: location && location !== '' ? location : '',
            bio: bio && bio !== '' ? bio : '',
            status: status && status !== '' ? status : '',
          };

          const socialFields = {
            twitter: twitter && twitter !== '' ? normalizeUrl(twitter) : '',
            facebook: facebook && facebook !== '' ? normalizeUrl(facebook) : '',
            linkedin: linkedin && linkedin !== '' ? normalizeUrl(linkedin) : '',
            youtube: youtube && youtube !== '' ? normalizeUrl(youtube) : '',
            instagram:
              instagram && instagram !== '' ? normalizeUrl(instagram) : '',
          };

          profileFields.social = socialFields;

          const profile = await this.profileModel.findOneAndUpdate(
            {
              user,
            },
            {
              $set: profileFields,
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
          );

          if (!profile) {
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                errors: 'Profile not created',
              },
              HttpStatus.BAD_REQUEST,
            );
          }

          return { data: profile, message: 'Profile created successfully' };
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getProfile(user: string) {
    try {
      const profile = await this.profileModel
        .findOne({ user })
        .populate('user', ['name', 'avatar']);

      if (!profile) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            errors: 'Profile not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        data: profile,
        message: 'Profile fetched successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
