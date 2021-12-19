import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Proverb, ProverbsDocument } from './proverbs.interface';
import { Model } from 'mongoose';

@Injectable()
export class ProverbsService {
  private readonly logger = new Logger(ProverbsService.name);
  private total: number | null = null;
  constructor(
    @InjectModel(Proverb.name)
    private Proverb: Model<ProverbsDocument>,
  ) {}

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  public async getRandom(): Promise<Proverb> {
    if (this.total === null) {
      this.logger.log('getting total proverbs from db...');
      this.total = await this.Proverb.countDocuments().exec();
      if (this.total <= 0) {
        this.logger.log('no proverbs on db...throwing error', this.total);
        throw new NotFoundException('no proverbs found');
      }
    }
    const randomNum = this.getRandomInt(this.total);
    this.logger.log('getting random post with num ', randomNum);
    return this.Proverb.findOne({ num: randomNum }).exec();
  }
  public async containsWords(
    words: Array<string>,
    page = 0,
  ): Promise<Array<Proverb>> {
    const perPage = 10;
    const p = (page = Math.max(0, page));
    const wordsRegex = words.reduce((prev, current) => `${prev}|${current}`);
    this.logger.log('getting proverbs that contain words', wordsRegex);
    return this.Proverb.find({
      text: { $regex: `(${wordsRegex})`, $options: 'i' },
    })
      .limit(perPage)
      .skip(p * perPage)
      .sort({
        num: 'asc',
      })
      .exec();
  }
  public async startsWith(word: string, page = 0): Promise<Array<Proverb>> {
    const perPage = 10;
    const p = (page = Math.max(0, page));
    return this.Proverb.find({
      text: { $regex: `^${word}`, $options: 'i' },
    })
      .limit(perPage)
      .skip(p * perPage)
      .sort({
        num: 'asc',
      })
      .exec();
  }
}
