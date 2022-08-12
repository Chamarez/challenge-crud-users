import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/utils/enum/role';
import { Auth } from './auth.decorator';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
  @Post('sign-up')
  async create(@Body() userData: RegisterDto): Promise<any> {
    return this.authService.register(userData);
  }
  @Auth()
  @Roles(Role.USER)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: RegisterDto,
  ): Promise<any> {
    return this.authService.update(id, userData);
  }
}
