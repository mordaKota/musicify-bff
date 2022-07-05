import { Test, TestingModule } from '@nestjs/testing';
import { BandsResolver } from './bands.resolver';

describe('BandsResolver', () => {
  let resolver: BandsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BandsResolver],
    }).compile();

    resolver = module.get<BandsResolver>(BandsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
