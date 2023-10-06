import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/schema/admin.schema';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtSecret } from './jwtSecret';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    AdminModule,
    JwtModule.register({
      secret: jwtSecret.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
