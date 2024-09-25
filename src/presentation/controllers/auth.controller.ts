import { Controller, Post, Body, UseFilters, HttpCode, HttpStatus, UseGuards, Req, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthExceptionFilter } from '../filters/auth-exception.filter';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';

@Controller('auth')
// @UseFilters(new AuthExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }
      throw new BadRequestException('Invalid credentials');
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }
      if (error.name === 'ConflictException') {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Registration failed. Please check your input.');
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Req() req: any) {
    try {
      const userId = req.user.sub;
      const refreshToken = req.user.refreshToken;
      return await this.authService.refreshTokens(userId, refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}