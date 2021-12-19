import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true })
  api_key_hash: string;
  @Prop({ required: true, unique: true })
  name: string;
}
export const ClientSchema = SchemaFactory.createForClass(Client);
