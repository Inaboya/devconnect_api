import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { MONGO_URI, JWT_SECRET } from './contants';

// console.log(process.env.JWT_SECRET, process.env.MONGO_URI);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(MONGO_URI),
    UsersModule,
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    ProfileModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
