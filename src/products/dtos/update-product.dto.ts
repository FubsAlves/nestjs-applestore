/* eslint-disable prettier/prettier */
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class UpdateProductDto {
    
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