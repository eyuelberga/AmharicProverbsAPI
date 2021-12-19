import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private clientsService: ClientsService) {
    super(
      { header: 'x-api-key', prefix: '' },
      true,
      async (apiKey, done, req) => {
        const checkKey = await this.clientsService.validateApiKey(apiKey);
        if (!checkKey) {
          return done(false);
        }
        return done(true);
      },
    );
  }
}
