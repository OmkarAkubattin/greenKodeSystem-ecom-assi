import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      // Normalize to Nest's UnauthorizedException so the framework returns 401
      if (err instanceof Error) throw new UnauthorizedException(err.message);
      throw new UnauthorizedException();
    }
    return user;
  }
}
