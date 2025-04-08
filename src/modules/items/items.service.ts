import { Injectable } from '@nestjs/common';
import { ItemDto } from './dto/items.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Items } from './entities/items.entity';
import { ItemIdDto } from './dto/item-id.dto';
import { ListItemDto } from './dto/list-item.dto';
import { Categories } from 'src/common/enums';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private items: Repository<Items>,
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async create(itemData: ItemDto, req: Request) {
    try {
      if (!itemData.category || !itemData.price || !itemData.item_name) {
        return {
          status: 400,
          message: 'Please Enter All Details',
        };
      }
      const user = await this.users.findOne({
        where: { id: req.user['userId'] },
      });

      const createItem = this.items.create({
        item_name: itemData.item_name,
        category: itemData.category,
        price: itemData.price,
        user: user,
      });
      const item = await this.items.save(createItem);
      if (!createItem) {
        return {
          status: 400,
          message: 'Error In Creating Item',
        };
      }

      return {
        status: 201,
        data: item,
        message: 'Item Created Successfully',
      };
    } catch (error) {
      return {
        status: 500,
        error: 'Internal Server Error',
        message: error,
      };
    }
  }

  async getOne(id: ItemIdDto) {
    try {
      const item = await this.items.findOne({
        where: { id: Number(id.item_id), is_deleted: false },
      });

      if (!item) {
        return {
          statsu: 404,
          message: 'Item Not Found',
        };
      }
      return {
        status: 200,
        data: item,
        message: 'Item Retrived Successfully',
      };
    } catch (error) {
      return {
        status: 500,
        error: 'Internal Server Error',
        message: error,
      };
    }
  }

  async list(list: ListItemDto) {
    try {
      const page = Number(list.page);
      const per_page = Number(list.per_page);
      const itemListQuery = this.items.createQueryBuilder('items');

      if (list?.category) {
        itemListQuery.where('category = :category', {
          category: list.category,
        });
      }

      if (list?.item_name) {
        itemListQuery.andWhere('item_name LIKE :name', {
          name: `%${list.item_name}%`,
        });
      }

      if(list?.page && list?.per_page){
        itemListQuery
        .skip((page - 1) * per_page)
        .take(per_page)
      }
        
      const listItems = await itemListQuery.getManyAndCount();

      return {
        status: 200,
        data: listItems,
        message: 'Item List Retrived successfully',
      };
    } catch (error) {
      return {
        status: 500,
        error: 'Internal Server Error',
        message: error,
      };
    }
  }

  async update(updateItem: UpdateItemDto, itemId: ItemIdDto) {
    try {
      const existingItem = await this.items.findOne({
        where: { id: Number(itemId.item_id), is_deleted: false },
      });
      if (!existingItem) {
        return {
          statsu: 404,
          message: 'Item Not Found',
        };
      }
      const updatedItem = await this.items.update(
        { id: Number(itemId.item_id) },
        {
          category: updateItem?.category,
          item_name: updateItem?.item_name,
          price: updateItem?.price,
        },
      );

      return {
        status: 200,
        data: {},
        message: 'Item Data Updated Successfully',
      };
    } catch (error) {
      return {
        status: 500,
        error: 'Internal Server Error',
        message: error,
      };
    }
  }

  async delete(itemId: ItemIdDto) {
    try {
      const existingItem = await this.items.findOne({
        where: { id: Number(itemId.item_id), is_deleted: false },
      });
      if (!existingItem) {
        return {
          statsu: 404,
          message: 'Item Not Found',
        };
      }
      const deletedItem = await this.items.update(
        { id: Number(itemId.item_id) },
        { is_deleted: true },
      );
      return {
        status: 200,
        data: {},
        message: 'Item Deleted successfully',
      };
    } catch (error) {
      return {
        status: 500,
        error: 'Internal Server Error',
        message: error,
      };
    }
  }
}
