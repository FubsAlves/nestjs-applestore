import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  private logger = new Logger(UsersController.name);
  @Post('/signup')
  async UserRegister(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.logger.log(createUserDto);
  }
  @Get()
  async listUsers(): Promise<string> {
    return 'aaa';
  }
}
