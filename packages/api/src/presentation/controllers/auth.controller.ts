import { Controller, Post, Body, UseFilters, HttpCode, HttpStatus, UseGuards, Req, BadRequestException, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { AuthExceptionFilter } from '../filters/auth-exception.filter';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
//@UseFilters(new AuthExceptionFilter())
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

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verifyToken(@Req() req: any) {
    try {
      const userId = req.user.userId;
      const accessToken = req.get('Authorization').replace('Bearer', '').trim();
      const result = await this.authService.verifyAndRefreshTokens(userId, accessToken);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Token is invalid or expired');
      }
      throw new BadRequestException('Verification failed');
    }
  }
}