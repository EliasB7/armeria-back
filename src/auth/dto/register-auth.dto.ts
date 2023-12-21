import { PartialType } from '@nestjs/swagger';
import { LoginAdminAuthDto, LoginUserAuthDto } from './login-auth.dto';

export class RegisterAdminAuthDto extends PartialType(LoginAdminAuthDto) {
  username: string;
  password: string;
}

export class RegisterUserAuthDto extends PartialType(LoginUserAuthDto) {
  name: string;
  lastName: string;
  street: string;
  city: string;
  zipCode: number;
  email: string;
  phone: number;
  password: string;
}
