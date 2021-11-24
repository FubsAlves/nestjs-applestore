import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  Length,
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
  @IsNotEmpty()
  @MaxLength(100)
  readonly street: string;

  @MaxLength(50)
  @IsString()
  @IsOptional()
  readonly complement: string;

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
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly firstName?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  readonly surname?: string;

  @IsString()
  @IsPhoneNumber('BR')
  @IsNotEmpty()
  @IsOptional()
  readonly phoneNumber?: string;

  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Type(() => UserAddressDto)
  public userAddress?: UserAddressDto;
}
