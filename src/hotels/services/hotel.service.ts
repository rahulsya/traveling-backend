import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    const getHotel = await this.hotelsRepository.find({
      relations: {
        images: true,
      },
    });
    return getHotel;
  }

  async getDetailHotel(id: number): Promise<Hotels> {
    const hotel = await this.hotelsRepository.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
      },
    });

    if (!hotel)
      throw new HttpException('Hotel not found', HttpStatus.NOT_FOUND);
    return hotel;
  }
}
