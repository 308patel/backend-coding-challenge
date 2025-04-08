import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Categories } from 'src/common/enums';

export class ListItemDto {
  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  per_page?: string;

  @IsOptional()
  @IsEnum(Categories)
  category: Categories;

  @IsString()
  @IsOptional()
  item_name?: string;
}
