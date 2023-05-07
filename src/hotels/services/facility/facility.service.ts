import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facility } from 'src/utils/entity/facilities.entity';
import { ValidateCreateFacility } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  async createFacility(data: ValidateCreateFacility): Promise<Facility> {
    const newFacility = await this.facilityRepository.create(data);
    return this.facilityRepository.save(newFacility);
  }

  async updateFaclity(id: number, data): Promise<Facility> {
    const findFacility = await this.facilityRepository.findOne({
      where: { id: id },
    });
    if (!findFacility) {
      throw new HttpException('Data facility not found', HttpStatus.NOT_FOUND);
    }

    return await this.facilityRepository.save({
      ...findFacility,
      ...data,
    });
  }

  async deleteFacility(id: number) {
    const findFacility = await this.facilityRepository.findOne({
      where: { id: id },
    });
    if (!findFacility) {
      throw new HttpException('Data facility not found', HttpStatus.NOT_FOUND);
    }

    await this.facilityRepository.remove(findFacility);

    return {
      message: 'success delete facility',
    };
  }
}
