export class CreateUserDto {
  readonly name: string;
  readonly lastName: string;
  readonly street: string;
  readonly city: string;
  readonly zipCode: number;
  readonly email: string;
  readonly phone: number;
  readonly password: string;
}
