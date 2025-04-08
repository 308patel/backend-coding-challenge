import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { Categories } from "src/common/enums";

export class ItemDto {

    @IsEnum(Categories)
    @IsNotEmpty()
    category!: Categories

    @IsString()
    @IsNotEmpty()
    item_name!: string;

    @Min(100, {message:"Price must be at least 3 digits "})
    @Max(999999, {message:"Price must not exceed 6 digits"})
    @IsNumber()
    @IsNotEmpty()
    price!: number;

}