import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ValidateCreateHotel } from 'src/utils/types';
import { Hotels } from '../../utils/entity/hotels.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotels)
    private readonly hotelsRepository: Repository<Hotels>,
  ) {}

  async createHotel(data: ValidateCreateHotel) {
    const newHotel = await this.hotelsRepository.create(data);
    return this.hotelsRepository.save(newHotel);
  }

  async allHotel(): Promise<Hotels[]> {
    const getHotel = await this.hotelsRepository.find();
    return getHotel;
  }
}
