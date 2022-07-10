import { BaseEntity } from './../base.entity';
import { Entity, Column } from 'typeorm';
@Entity('testUser')
export class TestUser extends BaseEntity {
  @Column()
  testname: string;

  @Column()
  testpassword: string;

  @Column({ default: '' })
  testavatar: string;
}
