import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async generateTokens(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '360d',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '400d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyRefreshToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  async verifyAccessToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Access token is invalid or expired');
    }
  }

  async generateAdminTokens(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...payload, type: 'access' },
        {
          secret: this.configService.get<string>('ADMIN_JWT_SECRET'),
          expiresIn: '360d', // Более длительный срок для админов
        }
      ),
      this.jwtService.signAsync(
        { ...payload, type: 'refresh' },
        {
          secret: this.configService.get<string>('ADMIN_JWT_REFRESH_SECRET'),
          expiresIn: '400d',
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAdminToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ADMIN_JWT_SECRET'),
      });
      
      if (payload.issuedFor !== 'admin-panel') {
        throw new UnauthorizedException('Invalid token type');
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Admin token is invalid or expired');
    }
  }
}