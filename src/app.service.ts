import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthCheck(): string {
    return 'Amharic Proverbs API is ready to go!';
  }
}
