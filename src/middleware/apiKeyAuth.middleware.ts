import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as passport from 'passport';
import { ApiKeyStrategy } from '../auth/apiKey.strategy';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class ApiKeyAuthMiddleware implements NestMiddleware {
  constructor(private apiKeyStrategy: ApiKeyStrategy) {}
  use(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      this.apiKeyStrategy,
      { session: false, failureRedirect: '/api/unauthorized' },
      (value) => {
        if (value) {
          next();
        } else {
          next(new UnauthorizedException());
        }
      },
    )(req, res, next);
  }
}
