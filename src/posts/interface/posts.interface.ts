import { Comments, Likes } from '../schema/post-schema';

export interface PostsInterface {
  user: string;
  text: string;
  name: string;
  avatar: string;
  likes: Likes[];
  comments: Comments[];
}
