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

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user && await user.comparePassword(password)) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateTokens(user);
  }

  async register(registerDto: RegisterDto) {
    // Check if username already exists
    const existingUsername = await this.userRepository.findByUsername(registerDto.username);
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check if email already exists
    const existingEmail = await this.userRepository.findByEmail(registerDto.email);
    if (existingEmail) {
      throw new ConflictException('Email already in use');
    }

    // Create new user
    const newUser = new User();
    newUser.username = registerDto.username;
    newUser.email = registerDto.email;
    newUser.password = registerDto.password;

    const savedUser = await this.userRepository.create(newUser);
    return this.generateTokens(savedUser);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshTokenMatches = await user.compareRefreshToken(refreshToken);
    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: User) {
    const payload = { username: user.username, sub: user.id };
    const tokens = await this.jwtAuthService.generateTokens(payload);
    await user.setRefreshToken(tokens.refreshToken);
    await this.userRepository.save(user);
    return tokens;
  }
}