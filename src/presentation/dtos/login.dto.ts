import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Email - обязательное поле' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Пароль - обязательное поле' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  @MaxLength(30, { message: 'Пароль должен быть не более 30 символов' })
  password: string;
}