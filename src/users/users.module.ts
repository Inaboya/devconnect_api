import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/contants';

console.log(process.env.JWT_KEY, 'JWT_SECRET');

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_SECRET,
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
