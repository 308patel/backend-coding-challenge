import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  minLength,
} from 'class-validator';
import { Role } from 'src/common/enums';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 14)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  role?: Role;
}
