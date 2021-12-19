import { Module } from '@nestjs/common';
import { ProverbsService } from './proverbs.service';
import { ProverbsController } from './proverbs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proverb, ProverbsSchema } from './proverbs.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proverb.name, schema: ProverbsSchema }]),
  ],
  providers: [ProverbsService],
  controllers: [ProverbsController],
  exports: [ProverbsService],
})
export class ProverbsModule {}
