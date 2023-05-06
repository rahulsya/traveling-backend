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
  @Column('varchar')
  first_name: string;
  @Column('varchar')
  last_name: string;
  @Column('varchar')
  email: string;
  @Column('varchar')
  phone_number: string;
  @Column('varchar')
  payment_file: string;
  @Column('varchar')
  bank_name: string;
  @Column('varchar')
  sender_name: string;
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
