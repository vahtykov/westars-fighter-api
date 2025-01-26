import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AdminLoginDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Email - обязательное поле' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Пароль - обязательное поле' })
  password: string;
}