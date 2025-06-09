import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleKeys, Roles } from '../types/user.type';

export class CreateUserPayloadDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 50)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 25)
  userName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsEnum(Roles, { message: 'INVALID_ROLE' })
  role: RoleKeys;
}
