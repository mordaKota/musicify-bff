import { Test, TestingModule } from '@nestjs/testing';
import { FavouritesResolver } from './favourites.resolver';

describe('FavouritesResolver', () => {
  let resolver: FavouritesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavouritesResolver],
    }).compile();

    resolver = module.get<FavouritesResolver>(FavouritesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
