import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { normalizeUrl } from 'src/utils/normalize-url';
import { validateExperienceInput } from 'src/utils/validateExperienceInputs';
import { validateProfileInputs } from 'src/utils/validateProfileInputs';
import { CreateProfileDTO } from './dto/create-profile-dto';
import { ExperienceDTO } from './dto/experience-dto';
import { ProfileInterface } from './interface/profile-interface';
import { v4 as uuid } from 'uuid';
import { EducationDTO } from './dto/education-dto';
import { validateEducationInput } from 'src/utils/validateEducation';
import axios from 'axios';

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

      return { data: profile, message: 'Profile updated successfully' };
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
            errors: `User doesn't have a profile yet`,
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
    let { from, to } = payload;
    const { title, company, location, current, description } = payload;

    if (to && from) {
      if (new Date(to).getTime() < new Date(from).getTime()) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: 'To date must be after from date',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    to = new Date(to).toISOString();
    from = new Date(from).toISOString();

    try {
      const { errors, isValid } = validateExperienceInput(payload);

      if (isValid === false) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const profile = await this.profileModel.findOne({ user });

        if (!profile) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              errors: 'User profile not found',
            },
            HttpStatus.NOT_FOUND,
          );
        }

        profile.experience.unshift({
          id: uuid(),
          title,
          company,
          location,
          from,
          to,
          current,
          description,
        });

        await profile.save();

        return {
          data: profile,
          message: 'Experience added successfully',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteExperience(id: string, user: string) {
    try {
      const profile = await this.profileModel.findOne({ user });

      if (!profile) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            errors: 'User profile not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const deletedValue = profile.experience.filter((exp) => exp.id !== id);

      profile.experience = deletedValue as any;

      await profile.save();

      return {
        data: profile,
        message: 'Experience deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async addEducation(payload: EducationDTO, user: string) {
    let { from, to } = payload;
    const { school, degree, fieldofstudy, current, description } = payload;

    if (to && from) {
      if (new Date(to).getTime() < new Date(from).getTime()) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: 'To date must be after from date',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    to = new Date(to).toISOString();
    from = new Date(from).toISOString();

    try {
      const { errors, isValid } = validateEducationInput(payload);

      if (isValid === false) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const profile = await this.profileModel.findOne({ user });

        if (!profile) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              errors: 'User profile not found',
            },
            HttpStatus.NOT_FOUND,
          );
        }

        profile.education.unshift({
          id: uuid(),
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description,
        });

        await profile.save();

        return {
          data: profile,
          message: 'Education added successfully',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteEducation(id: string, user: string) {
    try {
      const profile = await this.profileModel.findOne({ user });

      if (!profile) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            errors: 'User profile not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const deletedValue = profile.education.filter((exp) => exp.id !== id);

      profile.education = deletedValue as any;

      await profile.save();

      return {
        data: profile,
        message: 'Education deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  // async getGithubRepos(username: string) {
  //   try {
  //     const options = {
  //       uri: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
  //       method: 'GET',
  //       headers: { 'user-agent': 'node.js' },
  //     };

  //     const response = await axios.get(options as any);

  //     return {
  //       data: JSON.parse(response.data),
  //       message: 'Github repos fetched successfully',
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
