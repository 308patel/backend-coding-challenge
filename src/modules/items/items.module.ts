import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from './entities/items.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Items, User])],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}
