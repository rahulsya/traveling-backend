import {
  Body,
  Controller,
  Post,
  Request,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createOrderDto } from 'src/orders/dto/order.dto';
import { OrderService } from 'src/orders/services/order.service';
import { formatFileName, multerOptions } from 'src/utils/helpers';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/history')
  async findByUser(@Request() req) {
    return await this.orderService.ordersById(req.user.id);
  }

  @Get('/search/:id')
  async detailOrder(@Param() params) {
    return await this.orderService.getDetailOrder(params?.id);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('bank_transfer', multerOptions))
  async createOrder(
    @Body() orderForm: createOrderDto,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('File image empty', HttpStatus.BAD_REQUEST);
    }
    return await this.orderService.createOrder({
      ...orderForm,
      user: req.user,
      payment_file: `${process.env.PUBLIC_ASSET_URL}/${formatFileName(file)}`,
    });
  }
}
