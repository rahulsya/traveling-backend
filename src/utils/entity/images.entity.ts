import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotels } from './hotels.entity';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  image_url: string;
  @ManyToOne(() => Hotels, (hotel) => hotel.images)
  hotel: Hotels;
}
