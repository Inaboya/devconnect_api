import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDTO } from './dto/create-profile-dto';
import { ProfileInterface } from './interface/profile-interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile')
    private readonly profileModel: Model<ProfileInterface>,
  ) {}

  async createProfile(payload: CreateProfileDTO, user: string) {}
}
