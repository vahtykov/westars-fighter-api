import { Controller, Post, Body, UseGuards, UseFilters } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthExceptionFilter } from '../filters/auth-exception.filter';

@Controller('auth')
@UseFilters(new AuthExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}