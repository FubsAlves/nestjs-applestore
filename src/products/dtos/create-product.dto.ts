import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  readonly photoUrl: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly sellingPrice: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  readonly colors: Array<string>;
}
