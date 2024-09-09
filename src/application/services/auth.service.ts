import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtAuthService } from '../../infrastructure/auth/jwt.service';
import { LoginDto } from '../../presentation/dtos/login.dto';
import { RegisterDto } from '../../presentation/dtos/register.dto';
import { IUserRepository } from '../../core/repositories/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtAuthService: JwtAuthService,
    private userRepository: IUserRepository
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByUsername(loginDto.username);
    if (!user || !(await user.comparePassword(loginDto.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtAuthService.generateToken(user);
    return { access_token: token };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findByUsername(registerDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const existingEmail = await this.userRepository.findByEmail(registerDto.email);
    if (existingEmail) {
      throw new ConflictException('Email already in use');
    }

    const newUser = await this.userRepository.create(registerDto);
    return { message: 'User registered successfully', userId: newUser.id };
  }
}