import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';

describe('HotelService', () => {
  let provider: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelService],
    }).compile();

    provider = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
