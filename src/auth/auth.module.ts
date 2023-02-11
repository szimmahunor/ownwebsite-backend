import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './startegy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
class AuthModule {}

export default AuthModule;
