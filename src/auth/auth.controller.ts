import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminAuthDto, LoginUserAuthDto } from './dto/login-auth.dto';
import {
  RegisterAdminAuthDto,
  RegisterUserAuthDto,
} from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('loginAdmin')
  loginAdmin(@Body() adminObject: LoginAdminAuthDto) {
    return this.authService.loginAdmin(adminObject);
  }

  @Post('registerAdmin')
  registerAdmin(@Body() adminObject: RegisterAdminAuthDto) {
    return this.authService.registerAdmin(adminObject);
  }

  @Post('loginUser')
  loginUser(@Body() userObjectLogin: LoginUserAuthDto) {
    return this.authService.loginUser(userObjectLogin);
  }

  @Post('registerUser')
  async registerUser(@Body() userObject: RegisterUserAuthDto) {
    try {
      const result = await this.authService.registerUser(userObject);
      return { success: true, data: result };
    } catch (error) {
      console.error('Registration error:', error.message);
      return { success: false, message: 'Registration failed' };
    }
  }
}
