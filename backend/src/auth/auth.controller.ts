import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async create(@Body() userData: RegisterDto): Promise<any> {
    return this.authService.register(userData);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: RegisterDto,
  ): Promise<any> {
    return this.authService.update(id, userData);
  }
}
