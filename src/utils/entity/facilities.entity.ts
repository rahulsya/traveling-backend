import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Facility {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  name: string;
  @Column('text')
  desc: string;
}
