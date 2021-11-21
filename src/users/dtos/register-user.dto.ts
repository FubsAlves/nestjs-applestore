import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly surname: string;

  @IsString()
  @MaxLength(40)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message: 'A senha não é válida',
  })
  password: string;

  @IsEmail()
  @MaxLength(254)
  readonly email: string;

  @IsString()
  @IsPhoneNumber('BR')
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsString()
  @MinLength(11)
  @MaxLength(14)
  readonly identification: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly street: string;

  @MaxLength(50)
  @IsString()
  @IsOptional()
  readonly complement: string;

  @IsString()
  @IsPostalCode('BR')
  readonly postalCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly district: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(70)
  readonly city: string;

  @IsString()
  @Length(2, 2)
  readonly state: string;
}
