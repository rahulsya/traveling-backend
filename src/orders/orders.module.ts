import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/utils/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrdersModule {}
