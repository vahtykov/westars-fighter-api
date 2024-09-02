export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly firstName: string,
    public readonly password: string,
    public readonly confirmPassword: string,
    public readonly avatarUrl?: string,
    public readonly gender?: string,
    public readonly dateOfBirth?: Date,
    public readonly lastName?: string,
  ) {}
}
