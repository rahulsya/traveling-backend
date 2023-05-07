import { Module } from '@nestjs/common';
import { HotelService } from './services/hotel.service';
import { HotelController } from './controllers/hotel/hotel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesService } from './services/images/images.service';
import { ImagesController } from './controllers/images/images.controller';

import { Hotels } from 'src/utils/entity/hotels.entity';
import { Images } from 'src/utils/entity/images.entity';
import { Categories } from 'src/utils/entity/categories.entity';
import { Facility } from 'src/utils/entity/facilities.entity';
import { FacilityService } from './services/facility/facility.service';
import { FacilityController } from './controllers/facility/facility.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hotels, Images, Categories, Facility])],
  providers: [HotelService, ImagesService, FacilityService],
  controllers: [HotelController, ImagesController, FacilityController],
})
export class HotelsModule {}
