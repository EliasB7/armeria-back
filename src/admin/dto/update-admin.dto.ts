import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  readonly id: number;
  readonly username: string;
  readonly password: string;
  readonly isAdmin: boolean;
}
