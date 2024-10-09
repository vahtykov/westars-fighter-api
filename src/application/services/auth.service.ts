import { Injectable, UnauthorizedException, ConflictException, Inject } from '@nestjs/common';
import { JwtAuthService } from '../../infrastructure/auth/jwt.service';
import { LoginDto } from '../../presentation/dtos/login.dto';
import { RegisterDto } from '../../presentation/dtos/register.dto';
import { IUserRepository } from '../../core/repositories/user.repository.interface';
import { User } from '../../core/domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtAuthService: JwtAuthService,
    @Inject('IUserRepository')
    private userRepository: IUserRepository
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email, false);
    if (user && await user.comparePassword(password)) {
      return user;
    }
    return null;
  }

  async validateUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    return this.generateTokens(user);
  }

  async register(registerDto: RegisterDto) {
    // Check if email already exists
    const existingEmail = await this.userRepository.findByEmail(registerDto.email);
    if (existingEmail) {
      throw new ConflictException('Email уже занят');
    }

    // Create new user
    const newUser = new User();
    newUser.email = registerDto.email;
    newUser.password = registerDto.password;
    newUser.firstName = registerDto.firstName;
    newUser.lastName = registerDto.lastName;
    newUser.phone = registerDto.phone;

    const savedUser = await this.userRepository.create(newUser);
    return this.generateTokens(savedUser);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Неверный refresh token');
    }

    const refreshTokenMatches = await user.compareRefreshToken(refreshToken);
    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Неверный refresh token');
    }

    return this.generateTokens(user);
  }

  async verifyAndRefreshTokens(userId: string, accessToken: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    try {
      // Attempt to verify the current access token
      await this.jwtAuthService.verifyAccessToken(accessToken);
      // If successful, return the current user without generating new tokens
      return { user: this.sanitizeUser(user) };
    } catch (error) {
      // If the token is expired, generate new tokens
      const tokens = await this.generateTokens(user);
      return {
        user: this.sanitizeUser(user),
        ...tokens
      };
    }
  }

  private async generateTokens(user: User) {
    const payload = { email: user.email, sub: user.id };
    const tokens = await this.jwtAuthService.generateTokens(payload);
    await user.setRefreshToken(tokens.refreshToken);
    user.lastActivityAt = new Date();
    await this.userRepository.save(user);

    return tokens;
  }

  private sanitizeUser(user: User) {
    const { refreshToken, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}