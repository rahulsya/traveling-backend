import { Module } from '@nestjs/common';
import { HotelService } from './services/hotel.service';
import { HotelController } from './controllers/hotel/hotel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesService } from './services/images/images.service';
import { ImagesController } from './controllers/images/images.controller';

import { Hotels } from 'src/utils/entity/hotels.entity';
import { Images } from 'src/utils/entity/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotels, Images])],
  providers: [HotelService, ImagesService],
  controllers: [HotelController, ImagesController],
})
export class HotelsModule {}
