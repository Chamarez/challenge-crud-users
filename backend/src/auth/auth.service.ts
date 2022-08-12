import { forwardRef, Inject, Injectable, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BCRYPT } from 'src/bcrypt/bcrypt.const';
import { Bcrypt } from 'src/bcrypt/bcrypt.provider';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { LoginUser } from './dto/loginUser.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @Inject(BCRYPT) public bcryptProvider: Bcrypt,
  ) {}

  async register(user: RegisterDto): Promise<any> {
    return this.usersService.create(user);
  }
  async update(id: string, user: RegisterDto): Promise<any> {
    return this.usersService.update(id, user);
  }
  async login(user: LoginUser): Promise<any> {
    const payload = {
      email: user.email,
      _id: user._id,
      roles: user.roles,
    };
    return {
      ...payload,
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (
      user &&
      user.password &&
      this.bcryptProvider.compareSync(pass, user.password)
    ) {
      return user;
    }
    return null;
  }
}
