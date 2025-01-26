import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AdminLoginDto } from '../../presentation/dtos/admin-login.dto';
import { AuthService } from '../../application/services/auth.service';
import { JwtAuthService } from '../../infrastructure/auth/jwt.service';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('login')
  async adminLogin(@Body() loginDto: AdminLoginDto) {
    // Проверяем учетные данные админа
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    // Добавим проверку на null
    if (!user.password) {
      throw new UnauthorizedException('Учетная запись повреждена');
    }

    // Проверяем пароль
    const isPasswordValid = await user.comparePassword(loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    // Проверяем, является ли пользователь админом
    // TODO: Добавить проверку роли админа в сущность пользователя
    if (!user.isAdmin) {
      throw new UnauthorizedException('Недостаточно прав');
    }

    // Генерируем админский токен
    const payload = { 
      sub: user.id, 
      email: user.email,
      role: 'admin',
      issuedFor: 'admin-panel'
    };

    const tokens = await this.jwtAuthService.generateAdminTokens(payload);
    
    // Сохраняем refresh token
    await user.setRefreshToken(tokens.refreshToken);
    user.lastActivityAt = new Date();
    await user.save();

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      ...tokens
    };
  }
}