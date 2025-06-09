import { FindManyOptions, FindOneOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserPayloadDto } from '../dtos/create-user.dto';

export interface IUserService {
  hashPassword(password: string): Promise<string>;
  findOne(conditions: FindOneOptions<User>): Promise<User | null>;
  findMany(conditions: FindManyOptions<User>): Promise<User[]>;
  create(payload: CreateUserPayloadDto): Promise<void>;
}
