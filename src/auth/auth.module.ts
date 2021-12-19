import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './apiKey.strategy';
import { AdminSecretStrategy } from './adminSecret.strategy';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [PassportModule, ClientsModule],
  providers: [ApiKeyStrategy, AdminSecretStrategy],
  exports: [ApiKeyStrategy, AdminSecretStrategy],
})
export class AuthModule {}
