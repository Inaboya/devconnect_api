import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ProfileDocument = Profile & mongoose.Document;

interface SocialMedia {
  youtube: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

interface ExperienceFields {
  title: string;
  company: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

interface EducationFields {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ type: String })
  company: string;

  @Prop({ type: String })
  website: string;

  @Prop({ type: String })
  location: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: [String] })
  skills: string[];

  @Prop({ type: String })
  bio: string;

  @Prop({ type: String })
  githubusername: string;

  @Prop({ type: Array })
  experience: ExperienceFields[];

  @Prop({ type: Array })
  education: EducationFields[];

  @Prop({ type: Object })
  social: SocialMedia;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
