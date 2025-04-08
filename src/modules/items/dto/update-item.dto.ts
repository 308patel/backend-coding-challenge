import { PartialType } from '@nestjs/mapped-types';
import { ItemDto } from './items.dto';

export class UpdateItemDto extends PartialType(ItemDto) {}
