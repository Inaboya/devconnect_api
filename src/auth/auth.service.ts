import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: string;
}

@Injectable()
export class AuthGuard {
  constructor(private readonly authService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    let authStatus: boolean;

    if (!token) {
      authStatus = false;
      return authStatus;
    }

    try {
      const user: User = await this.authService.verify(token);

      if (!user) {
        authStatus = false;
        return authStatus;
      }

      request.user = user;
      authStatus = true;
      return authStatus;
    } catch (error) {
      //   return false;
      console.log(error.message);
      authStatus = false;
      return authStatus;
    }
  }
}
