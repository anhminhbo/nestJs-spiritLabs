import { randEmail, randFullName, randPassword } from '@ngneat/falso';
import { define } from 'typeorm-seeding';
import { User } from '../../user/user.entity';

define(User, () => {
  const user = new User();
  user.name = randFullName();
  user.password = randPassword();
  user.avatar = randEmail();
  return user;
});
