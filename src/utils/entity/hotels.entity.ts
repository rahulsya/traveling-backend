import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Categories } from './categories.entity';
import { Images } from './images.entity';
import { Facility } from './facilities.entity';

@Entity()
export class Hotels {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  name: string;
  @Column('varchar')
  location: string;
  @Column({
    type: 'boolean',
    default: false,
  })
  isPopular: boolean;
  @Column('text')
  description: string;
  @Column('integer')
  price: number;
  @OneToMany(() => Images, (image) => image.hotel, { cascade: true })
  images: Images[];
  @ManyToOne(() => Categories, (category) => category.hotels)
  categories: Categories;
  @ManyToMany(() => Facility)
  @JoinTable()
  facilities: Facility[];
}
