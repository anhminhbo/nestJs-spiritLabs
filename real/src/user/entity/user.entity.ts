import { BaseEntity } from '../../base.entity';
import { Entity, Column } from 'typeorm';
import { Role } from '../../role/role.enum';
import { Exclude } from 'class-transformer';
@Entity('User')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Exclude()
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  avatar: string;

  @Column({ enum: Role, default: Role.CUSTOMER })
  role: Role;
}
