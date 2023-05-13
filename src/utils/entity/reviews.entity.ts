import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Hotels } from './hotels.entity';

@Entity()
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('integer')
  rating: number;
  @Column('text')
  review: string;
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
  @ManyToOne(() => Hotels, (hotel) => hotel.reviews)
  hotel: Hotels;
  @Column('varchar')
  email: string;
  @Column('varchar')
  name: string;
}
