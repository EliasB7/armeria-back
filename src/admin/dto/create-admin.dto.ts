export class CreateAdminDto {
  readonly id: number;
  readonly username: string;
  readonly password: string;
  readonly isAdmin: boolean;
}
