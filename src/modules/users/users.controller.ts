import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Res,
  Param,
  Patch,
} from '@nestjs/common';
import { Role } from 'src/common/enums';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserDto } from './dto/user.dto';
import { Response } from 'express';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  create(@Body() user: UserDto, @Res() res: Response) {
    return this.usersService.register(user, res);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('list')
  listUsers(@Res() res: Response) {
    return this.usersService.listUsers(res);
  }
}
