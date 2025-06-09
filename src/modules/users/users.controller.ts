import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserPayloadDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() payload: CreateUserPayloadDto): Promise<void> {
    return this.usersService.create(payload);
  }
}
