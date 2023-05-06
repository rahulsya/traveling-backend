import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Categories } from './categories.entity';
import { Images } from './images.entity';

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
  @ManyToOne(()=>Categories,(category=>category.hotels))
  categories:Categories
}
