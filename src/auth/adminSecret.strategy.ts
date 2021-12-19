import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminSecretStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
) {
  constructor() {
    super(
      { header: 'x-admin-secret', prefix: '' },
      true,
      async (adminSecret, done, req) => {
        const check = adminSecret === process.env.ADMIN_SECRET;
        if (!check) {
          return done(false);
        }
        return done(true);
      },
    );
  }
}
