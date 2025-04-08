import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/common/enums';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ItemDto } from './dto/items.dto';
import { ItemsService } from './items.service';
import { ItemIdDto } from './dto/item-id.dto';
import { ListItemDto } from './dto/list-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('')
  create(@Body() item: ItemDto, @Req() req) {
    return this.itemsService.create(item, req);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':item_id')
  getOne(@Param() id: ItemIdDto) {
    return this.itemsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('')
  list(@Query() list: ListItemDto) {
    return this.itemsService.list(list);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':item_id')
  update(@Body() updateItem: UpdateItemDto, @Param() item_id: ItemIdDto) {
    return this.itemsService.update(updateItem, item_id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':item_id')
  delete(@Param() item_id: ItemIdDto) {
    return this.itemsService.delete(item_id);
  }
}
