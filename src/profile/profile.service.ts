import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProfileDTO } from './dto/create-profile-dto';
import { ProfileInterface } from './interface/profile-interface';

@Injectable()
export class ProfileService {
    constructor('Profile' private readonly profileModel: Model<ProfileInterface>){}

    async createProfile(payload: CreateProfileDTO, user: string) {
        
    }
}
