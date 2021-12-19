import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as passport from 'passport';
import { AdminSecretStrategy } from '../auth/adminSecret.strategy';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class AdminSecretAuthMiddleware implements NestMiddleware {
  constructor(private adminSecretStrategy: AdminSecretStrategy) {}
  use(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      this.adminSecretStrategy,
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
