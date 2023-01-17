import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 25 })
  username: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;
}
