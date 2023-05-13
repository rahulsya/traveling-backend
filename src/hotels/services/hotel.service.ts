import { Injectable, HttpException, HttpStatus, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { ValidateCreateHotel, ValidateUpdateHotel } from 'src/utils/types';
import { Hotels } from '../../utils/entity/hotels.entity';
import { Categories } from '../../utils/entity/categories.entity';
import { Facility } from 'src/utils/entity/facilities.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotels)
    private readonly hotelsRepository: Repository<Hotels>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  async createHotel(data: ValidateCreateHotel) {
    const Getfacilities = await this.facilityRepository.find({
      where: {
        id: In(data.facilitiesId),
      },
    });
    const newHotel = await this.hotelsRepository.create({
      ...data,
      categories: { id: data.categoryId },
    });
    newHotel.facilities = [...Getfacilities];
    return this.hotelsRepository.save(newHotel);
  }

  async allHotel(): Promise<Hotels[]> {
    const getHotel = await this.hotelsRepository.find({
      relations: {
        images: true,
        categories: true,
        facilities: true,
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
        categories: true,
        facilities: true,
        reviews: true,
      },
    });

    if (!hotel)
      throw new HttpException('Hotel not found', HttpStatus.NOT_FOUND);
    return hotel;
  }
  async hotelCategories(): Promise<any[]> {
    const hotelCategories = await this.categoriesRepository.find({
      relations: {
        hotels: {
          images: true,
        },
      },
    });
    return hotelCategories;
  }

  async updateHotel(data: ValidateUpdateHotel, id: number): Promise<Hotels> {
    const hotel = await this.hotelsRepository.findOne({
      where: {
        id,
      },
    });
    if (!hotel)
      throw new HttpException('Data Hotel not found', HttpStatus.NOT_FOUND);
    let updateData = data;
    if (data.categories) {
      updateData = { ...updateData, categories: { id: data.categories } };
    }

    if (data.facilities) {
      const Getfacilities = await this.facilityRepository.find({
        where: {
          id: In(data.facilities),
        },
      });
      updateData = { ...updateData, facilities: [...Getfacilities] };
    }

    return await this.hotelsRepository.save({
      ...hotel,
      ...updateData,
    });
  }
}
