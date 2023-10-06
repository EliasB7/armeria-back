import { HttpException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/admin/schema/admin.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async login(userObjectLogin: LoginAuthDto) {
    const { username, password } = userObjectLogin;
    const findUser = await this.adminModel.findOne({ username });

    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { name: findUser.username };
    const token = await this.jwtService.sign(payload);
    const data = {
      username: findUser,
      token,
    };

    return data;
  }

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plaintoHash = await hash(password, 12);
    userObject = { ...userObject, password: plaintoHash };
    return this.adminModel.create(userObject);
  }
}
