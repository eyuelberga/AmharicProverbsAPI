import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProverbsDocument = Proverb & Document;

@Schema()
export class Proverb {
  @ApiProperty({ type: Number })
  @Prop()
  num: number;
  @ApiProperty({ type: String })
  @Prop()
  text: string;
}
export const ProverbsSchema = SchemaFactory.createForClass(Proverb);

export class ProverbResponse {
  @ApiProperty({ type: String })
  text: string;
}
