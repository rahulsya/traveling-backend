import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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
  @Column('varchar')
  description: string;
  @Column('integer')
  price: number;
  @OneToMany(() => Images, (image) => image.hotel, { cascade: true })
  images: Images[];
}
