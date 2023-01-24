import {
  Controller,
  Request,
  Response,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Public } from 'src/auth/guard.decorator';

import { CreateHotelDto } from 'src/hotels/dto/createHotel.dto';
import { HotelService } from 'src/hotels/services/hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Public()
  @Get('/all')
  async getHotels(@Response() res) {
    const hotels = await this.hotelService.allHotel();
    return res.json({
      status: 'success',
      data: hotels,
    });
  }

  @Public()
  @Get('/detail/:id')
  async detailHotel(@Param() params) {
    return await this.hotelService.getDetailHotel(params?.id);
  }

  @Public()
  @Post('/create')
  async create(@Request() req, @Response() res) {
    const data: CreateHotelDto = req.body;
    try {
      const newHotel = await this.hotelService.createHotel(data);
      return res.json({
        status: 'success',
        data: newHotel,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
