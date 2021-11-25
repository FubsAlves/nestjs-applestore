import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserAddressDto {
  @IsString()
  @IsPostalCode('BR')
  readonly postalCode: string;

  @IsString()
  @MaxLength(100)
  readonly street: string;

  @MaxLength(50)
  @IsString()
  @IsOptional()
  readonly complement: string;

  @IsString()
  @MaxLength(50)
  readonly district: string;

  @IsString()
  @MaxLength(70)
  readonly city: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2)
  readonly state: string;
}
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

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => UserAddressDto)
  public userAddress: UserAddressDto;
}
