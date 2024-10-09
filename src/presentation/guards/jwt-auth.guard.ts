import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../application/services/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private userService: UserService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user is active
    const isActive = await this.userService.isUserActive(user.userId);
    if (!isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    // Update last activity timestamp
    await this.userService.updateLastActivity(user.userId);

    return true;
  }
}