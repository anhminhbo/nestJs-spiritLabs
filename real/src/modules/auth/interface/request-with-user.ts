import { User } from '../../user/entity/user.entity';
import { Request } from 'express';

export default interface RequestWithUser extends Request {
  user: User;
}
