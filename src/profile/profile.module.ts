import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './schema/profile-schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
    }),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
