import { HttpException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/admin/schema/admin.schema';
import { LoginAdminAuthDto, LoginUserAuthDto } from './dto/login-auth.dto';
import {
  RegisterAdminAuthDto,
  RegisterUserAuthDto,
} from './dto/register-auth.dto';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async loginAdmin(userObjectLogin: LoginAdminAuthDto) {
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

  async registerAdmin(userObject: RegisterAdminAuthDto) {
    const { password } = userObject;
    const plaintoHash = await hash(password, 12);
    userObject = { ...userObject, password: plaintoHash };
    return this.adminModel.create(userObject);
  }

  async loginUser(userObjectLogin: LoginUserAuthDto) {
    const { email, password } = userObjectLogin;
    const findUser = await this.userModel.findOne({ email });

    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { name: findUser.email };
    const token = await this.jwtService.sign(payload);
    const data = {
      username: findUser,
      token,
    };

    return data;
  }

  async registerUser(userObject: RegisterUserAuthDto) {
    try {
      const { password } = userObject;
      const plaintoHash = await hash(password, 12);
      const newUserObject = { ...userObject, password: plaintoHash };

      const createdUser = await this.userModel.create(newUserObject);

      return {
        success: true,
        data: createdUser.toObject(),
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.error('Validation Errors:', error.errors);
      } else {
        console.error(error);
      }
      throw new HttpException('REGISTRATION_FAILED', 500);
    }
  }
}
