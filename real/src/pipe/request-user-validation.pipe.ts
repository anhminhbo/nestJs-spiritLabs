import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ForbiddenException,
} from '@nestjs/common';
import { RequestUser } from '../utils/class';

@Injectable()
export class RequestUserValidationPipe
  implements PipeTransform<RequestUser, RequestUser>
{
  transform(value: RequestUser, metadata: ArgumentMetadata): RequestUser {
    const { userId, role } = value;
    if (!userId) {
      throw new ForbiddenException('Header userid invalid');
    }
    return value;
  }
}
