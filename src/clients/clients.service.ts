import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './clients.interface';
import * as crypto from 'crypto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);
  constructor(
    @InjectModel(Client.name)
    private Client: Model<ClientDocument>,
  ) {}
  private getHash(text: string) {
    const hmac = crypto.createHmac('sha256', process.env.HMAC_SECRET);
    hmac.update(text);
    const hash = hmac.digest('hex');
    return hash;
  }
  public async validateApiKey(apiKey: string) {
    const apiHash = this.getHash(apiKey);
    this.logger.log(apiHash);
    const found = await this.Client.findOne({ api_key_hash: apiHash }).exec();
    return !!found;
  }
  public async generateApiKey(name: string): Promise<string> {
    try {
      const apiKey: string = uuid();
      const apiHash = this.getHash(apiKey);
      await new this.Client({
        name,
        api_key_hash: apiHash,
      }).save();

      return apiKey;
    } catch (err) {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new BadRequestException('name already exists');
      }
      throw new InternalServerErrorException('something went wrong');
    }
  }
  public async deleteApiKey(name: string): Promise<Client> {
    const client = await this.Client.findOneAndDelete({ name }).exec();
    if (!client) {
      throw new NotFoundException('name does not exist');
    }
    return client;
  }
}
