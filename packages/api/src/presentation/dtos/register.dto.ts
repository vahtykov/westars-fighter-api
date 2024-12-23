import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Email - обязательное поле' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Пароль - обязательное поле' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  @MaxLength(30, { message: 'Пароль должен быть не более 30 символов' })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Слишком легкий пароль',
  // })
  password: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  lastName?: string;

  @IsString()
  @IsOptional()
  @Matches(/^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, {
    message: 'Некорректный формат телефона',
  })
  phone?: string;
}
