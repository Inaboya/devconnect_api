import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { normalizeUrl } from 'src/utils/normalize-url';
import { validateProfileInputs } from 'src/utils/validateProfileInputs';
import { CreateProfileDTO } from './dto/create-profile-dto';
import { ExperienceDTO } from './dto/experience-dto';
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

  async getAllProfiles() {
    try {
      const profiles = await this.profileModel
        .find()
        .populate('user', ['name', 'avatar']);

      if (!profiles) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            errors: 'No profiles found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return { data: profiles, message: 'Profiles fetched successfully' };
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

  async addExperience(payload: ExperienceDTO, user) {
    try {
    } catch (error) {
      throw error;
    }
  }
}
