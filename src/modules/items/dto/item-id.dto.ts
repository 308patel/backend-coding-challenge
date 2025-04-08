import { IsNotEmpty, IsString } from "class-validator";

export class ItemIdDto {
    @IsString()
    @IsNotEmpty()
    item_id!: string;
}