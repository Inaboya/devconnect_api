import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export interface Likes {
  user: mongoose.Schema.Types.ObjectId;
}

export interface Comments {
  user: mongoose.Schema.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
  date: Date;
}

@Schema({ timestamps: true })
export class Posts {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user: string;

  @Prop({ type: String })
  text: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: [Object] })
  likes: Likes[];

  @Prop({ type: [Object] })
  comments: Comments[];
}
