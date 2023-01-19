import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
