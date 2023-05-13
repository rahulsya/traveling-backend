import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelController } from './controllers/hotel/hotel.controller';
import { ImagesController } from './controllers/images/images.controller';
import { FacilityController } from './controllers/facility/facility.controller';
import { ReviewController } from './controllers/review/review.controller';

import { Hotels } from 'src/utils/entity/hotels.entity';
import { Images } from 'src/utils/entity/images.entity';
import { Categories } from 'src/utils/entity/categories.entity';
import { Facility } from 'src/utils/entity/facilities.entity';
import { Reviews } from 'src/utils/entity/reviews.entity';

import { HotelService } from './services/hotel.service';
import { ImagesService } from './services/images/images.service';
import { FacilityService } from './services/facility/facility.service';
import { ReviewService } from './services/review/review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotels, Images, Categories, Facility, Reviews]),
  ],
  providers: [HotelService, ImagesService, FacilityService, ReviewService],
  controllers: [
    HotelController,
    ImagesController,
    FacilityController,
    ReviewController,
  ],
})
export class HotelsModule {}
