import { Injectable } from '@nestjs/common';
import { Response, response } from 'express';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from 'src/common/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.users.findOne({ where: { username: username } });

    return user;
  }

  async register(user: UserDto, res: Response) {
    try {
      if (
        !user.email ||
        !user.first_name ||
        !user.last_name ||
        !user.password ||
        !user.username
      ) {
        return res.status(400).json({
          status: 400,
          message:
            'Please provide all the fields. EX. first_name, last_name, username, email and password',
        });
      }
      const existingUserEmail = await this.users.findOne({
        where: { email: user.email },
      });

      if (existingUserEmail) {
        return res.status(400).json({
          status: 400,
          message: 'User With This Email Already Exists',
        });
      }

      const existingUserName = await this.users.findOne({
        where: { username: user.username },
      });

      if (existingUserName) {
        return res.status(400).json({
          status: 400,
          message: 'Username Already Taken',
        });
      }

      const hashPassword = await bcrypt.hash(user.password, 10);
      const registerUser = await this.users.save({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: hashPassword,
        role: user?.role,
      });

      return res.status(201).json({
        staus: 201,
        data: registerUser,
        message: 'User Register successfully',
      });
    } catch (error) {
      return response.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: error,
      });
    }
  }

  async listUsers(res: Response) {
    try {
      const users = await this.users.find({
        where: { is_deleted: false, role: Role.USER },
      });

      return res.status(200).json({
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: error,
      });
    }
  }
}
