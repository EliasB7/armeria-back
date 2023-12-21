import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly name: string;
  readonly lastName: string;
  readonly street: string;
  readonly city: string;
  readonly zipCode: number;
  readonly email: string;
  readonly phone: number;
  readonly password: string;
}
