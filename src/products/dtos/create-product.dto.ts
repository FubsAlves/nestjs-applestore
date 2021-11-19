/* eslint-disable prettier/prettier */
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    photoUrl : string;

    @IsNumber()
    @IsNotEmpty()
    sellingPrice : number;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    colors: Array<string>

}