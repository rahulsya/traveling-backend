import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type UserRoleType = 'admin' | 'user';
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

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: string;
}
