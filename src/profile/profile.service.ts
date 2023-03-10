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
    console.log(payload, 'what is the payload');
    // const errors = validateProfileInputs(payload);

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
        website:
          (website && website !== '') || undefined ? normalizeUrl(website) : '',
        skills: Array.isArray(skills || undefined)
          ? skills
          : skills?.map((skill: string) => ' ' + skill.trim()),
        company: (company && company !== '') || undefined ? company : '',
        location: (location && location !== '') || undefined ? location : '',
        bio: (bio && bio !== '') || undefined ? bio : '',
        status: (status && status !== '') || undefined ? status : '',
      };

      const socialFields = {
        twitter:
          (twitter && twitter !== '') || undefined ? normalizeUrl(twitter) : '',
        facebook:
          (facebook && facebook !== '') || undefined
            ? normalizeUrl(facebook)
            : '',
        linkedin:
          (linkedin && linkedin !== '') || undefined
            ? normalizeUrl(linkedin)
            : '',
        youtube:
          (youtube && youtube !== '') || undefined ? normalizeUrl(youtube) : '',
        instagram:
          (instagram && instagram !== '') || undefined
            ? normalizeUrl(instagram)
            : '',
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
