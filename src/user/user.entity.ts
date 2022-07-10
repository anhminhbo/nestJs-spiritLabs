import { BaseEntity } from './../base.entity';
import { Entity, Column } from 'typeorm';
@Entity('User')
export class User extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;
}
