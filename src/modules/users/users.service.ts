import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserService } from './interfaces/user-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserPayloadDto } from './dtos/create-user.dto';
import { NullableType } from 'src/utils/types/nullable';
import { Roles } from './types/user.type';
import { USER_ERROR } from './users.error';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  findOne(conditions: FindOneOptions<User>): Promise<NullableType<User>> {
    return this.userRepository.findOne(conditions);
  }

  findMany(conditions: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(conditions);
  }

  async create(payload: CreateUserPayloadDto): Promise<void> {
    const { email, password, userName, avatar, role } = payload;

    const existEmail = await this.findOne({
      where: { email },
    });

    if (existEmail) {
      throw new ConflictException(USER_ERROR.EMAIL_ALREADY_EXIST);
    }

    if (userName) {
      const existUserName = await this.findOne({
        where: { userName },
      });

      if (existUserName) {
        throw new ConflictException(USER_ERROR.USER_NAME_ALREADY_EXIST);
      }
    }

    if (avatar) {
      // TODO: Check if the avatar exist on media table
    }

    if (role === Roles.Admin) {
      throw new ForbiddenException(USER_ERROR.YOU_DO_NOT_HAVE_PERMISSION);
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      userName,
      avatar,
      role,
    });

    await this.userRepository.save(newUser);
  }
}
