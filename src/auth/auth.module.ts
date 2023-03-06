import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
    }),
  ],
  providers: [AuthGuard],
})
export class AuthModule {}
