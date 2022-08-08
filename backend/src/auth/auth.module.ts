import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';

@Module({
  imports: [forwardRef(() => UsersModule), BcryptModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
