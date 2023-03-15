import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Mongoose } from 'mongoose';
import { PostsSchema } from './schema/post-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/contants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Posts', schema: PostsSchema }]),
    JwtModule.register({
      secret: JWT_SECRET,
    }),
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
