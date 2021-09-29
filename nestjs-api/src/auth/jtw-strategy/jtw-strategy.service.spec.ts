import { Test, TestingModule } from '@nestjs/testing';
import { JtwStrategyService } from './jtw-strategy.service';

describe('JtwStrategyService', () => {
  let service: JtwStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JtwStrategyService],
    }).compile();

    service = module.get<JtwStrategyService>(JtwStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
