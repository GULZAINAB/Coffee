import { Test, TestingModule } from '@nestjs/testing';
import { CoffeRattingService } from './coffe-ratting.service';

describe('CoffeRattingService', () => {
  let service: CoffeRattingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeRattingService],
    }).compile();

    service = module.get<CoffeRattingService>(CoffeRattingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
