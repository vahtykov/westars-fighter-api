export class CreateUserDto {
  email: string;
  firstName: string;
  password: string;
  confirmPassword: string;
  avatarUrl?: string;
  gender?: string;
  dateOfBirth?: Date;
  lastName?: string;
}
