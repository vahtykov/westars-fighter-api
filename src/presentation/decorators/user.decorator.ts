import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/core/domain/entities/user.entity';

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Assuming the user is attached to the request object by a guard
  },
);