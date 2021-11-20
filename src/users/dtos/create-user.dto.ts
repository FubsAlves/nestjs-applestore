import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  street: string;

  @MaxLength(50)
  @IsString()
  @IsOptional()
  complement: string;

  @IsString()
  @IsPostalCode('BR')
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  district: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(70)
  city: string;

  @IsString()
  @Length(2, 2)
  state: string;
}

export class CreateUserDto {
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  surname: string;

  @IsString()
  @MinLength(6)
  @MaxLength(40)
  password: string;

  @IsEmail()
  @MaxLength(254)
  readonly email: string;

  @IsString()
  @IsPhoneNumber('BR')
  readonly phoneNumber: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  readonly avatarUrl: string;

  @IsString()
  @MinLength(11)
  @MaxLength(14)
  identification: string;

  @IsNotEmpty()
  userAddress: AddressDto;
}
