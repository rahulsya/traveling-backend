import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Hotels } from './hotels.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  invoice_number: string;
  @Column('date')
  start_date: Date;
  @Column('date')
  end_date: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Hotels)
  @JoinColumn()
  hotel: Hotels;
}
