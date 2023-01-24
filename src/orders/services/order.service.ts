import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';

import { Order } from 'src/utils/entity/order.entity';
import { generateInvoiceNumber } from 'src/utils/helpers';
import { ValidateCreateOrder } from 'src/utils/types';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async createOrder(data: ValidateCreateOrder) {
    const payload = {
      invoice_number: generateInvoiceNumber(),
      start_date: moment(data.start_date).toDate(),
      end_date: moment(data.end_date).toDate(),
      user: {
        id: data.user.id,
      },
      hotel: { id: data.hotelId },
    };
    const createNewOrder = await this.orderRepository.create(payload);
    return await this.orderRepository.save(createNewOrder);
  }

  async ordersById(id: number): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        user: true,
        hotel: {
          images: true,
        },
      },
    });
    if (!orders)
      throw new HttpException('Order History not found', HttpStatus.NOT_FOUND);

    return orders;
  }

  async getDetailOrder(invoice: string): Promise<Order> {
    const orders = await this.orderRepository.findOne({
      where: {
        invoice_number: invoice,
      },
      relations: {
        user: true,
        hotel: {
          images: true,
        },
      },
    });
    if (!orders)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    return orders;
  }
}
