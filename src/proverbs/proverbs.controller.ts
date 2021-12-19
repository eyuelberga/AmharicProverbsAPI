import {
  Controller,
  Get,
  Query,
  ParseArrayPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ProverbsService } from './proverbs.service';
import { ApiTags, ApiOkResponse, ApiHeader } from '@nestjs/swagger';
import { ProverbResponse } from './proverbs.interface';

@ApiHeader({ name: 'x-api-key', description: 'Key to access API endpoint' })
@Controller('proverbs')
@ApiTags('proverbs')
export class ProverbsController {
  constructor(private readonly proverbsService: ProverbsService) {}
  @Get('contains')
  @ApiOkResponse({ description: 'Proverbs retrieved successfully.' })
  public async contains(
    @Query('words', new ParseArrayPipe({ items: String, separator: ',' }))
    words: Array<string>,
    @Query('page', ParseIntPipe)
    page?: number,
  ): Promise<Array<ProverbResponse>> {
    const result = await this.proverbsService.containsWords(words, page);
    return result.map(({ text }) => ({ text }));
  }
  @Get('starts_with')
  @ApiOkResponse({ description: 'Proverbs retrieved successfully.' })
  public async startsWith(
    @Query('word')
    word: string,
    @Query('page', ParseIntPipe)
    page?: number,
  ): Promise<Array<ProverbResponse>> {
    const result = await this.proverbsService.startsWith(word, page);
    return result.map(({ text }) => ({ text }));
  }
  @Get('random')
  @ApiOkResponse({ description: 'Random Proverb retrieved successfully.' })
  public async random(): Promise<ProverbResponse> {
    const { text } = await this.proverbsService.getRandom();
    return { text };
  }
}
