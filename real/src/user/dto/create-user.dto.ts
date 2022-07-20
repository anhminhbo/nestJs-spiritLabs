import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Role } from '../../role/role.enum';

enum ValidationErrorMessage {
  InvalidFullNameLength = 'FullName must be between 1 and 255 letters!',
  InvalidAvatarLength = 'Avatar must be between 1 and 255 letters!',
  InvalidPasswordLength = 'Password must be between 6 and 100 letters!',
  InvalidRoleLength = 'Role must be between 1 and 10 letters!',
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(1, 255, {
    message: ValidationErrorMessage.InvalidFullNameLength,
  })
  fullName: string;

  @ApiProperty()
  @IsString()
  @Length(6, 100, {
    message: ValidationErrorMessage.InvalidPasswordLength,
  })
  password: string;

  @ApiProperty()
  @IsString()
  @Length(1, 255, {
    message: ValidationErrorMessage.InvalidAvatarLength,
  })
  avatar: string;

  @ApiProperty()
  @IsString()
  @Length(1, 10, {
    message: ValidationErrorMessage.InvalidRoleLength,
  })
  role: Role;
}
