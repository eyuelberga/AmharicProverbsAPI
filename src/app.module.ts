import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProverbsModule } from './proverbs/proverbs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ApiKeyAuthMiddleware } from './middleware/apiKeyAuth.middleware';
import { AdminSecretAuthMiddleware } from './middleware/adminSecretAuth.middleware';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProverbsModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyAuthMiddleware).forRoutes('proverbs');
    consumer.apply(AdminSecretAuthMiddleware).forRoutes('clients');
  }
}
