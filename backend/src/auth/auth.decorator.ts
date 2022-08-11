import { applyDecorators, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';

export function Auth(): any {
  return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard));
}
