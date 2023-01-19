import { Module } from '@nestjs/common';
import { HotelService } from './services/hotel.service';
import { HotelController } from './controllers/hotel/hotel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from 'src/utils/entity/hotels.entity';
import { ImagesService } from './services/images/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotels])],
  providers: [HotelService, ImagesService],
  controllers: [HotelController],
})
export class HotelsModule {}
