import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private users: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return {
        status: 401,
        message: 'invalid creds',
      };
    }
    const dcryptPass = await bcrypt.compare(password, user.password);

    if (user && dcryptPass) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      status: 201,
      access_token: this.jwtService.sign(payload),
      message: 'login success',
    };
  }
}
