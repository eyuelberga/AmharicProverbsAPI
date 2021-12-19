import { Test, TestingModule } from '@nestjs/testing';
import { ProverbsController } from './proverbs.controller';

describe('ProverbsController', () => {
  let controller: ProverbsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProverbsController],
    }).compile();

    controller = module.get<ProverbsController>(ProverbsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
