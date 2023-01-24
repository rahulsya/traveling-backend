import { Body, Controller, Post, Request, Get, Param } from '@nestjs/common';
import { createOrderDto } from 'src/orders/dto/order.dto';
import { OrderService } from 'src/orders/services/order.service';

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
  async createOrder(@Body() orderForm: createOrderDto, @Request() req) {
    return await this.orderService.createOrder({
      ...orderForm,
      user: req.user,
    });
  }
}
