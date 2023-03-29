import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export interface Likes {
  user: string;
}

export interface Comments {
  user: mongoose.Types.ObjectId;
  text: string;
  name: string;
  avatar: string;
}

({ timestamps: true });
export class Posts {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

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

export const PostsSchema = SchemaFactory.createForClass(Posts);
