import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { RequestUser } from '../utils/class';
export declare class RequestUserValidationPipe implements PipeTransform<RequestUser, RequestUser> {
    transform(value: RequestUser, metadata: ArgumentMetadata): RequestUser;
}
