import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './auth.service';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminLocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
