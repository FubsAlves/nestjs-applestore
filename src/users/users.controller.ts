import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  private logger = new Logger(UsersController.name);
  @Post('/signup')
  @UsePipes(ValidationPipe)
  async UserRegister(@Body() createUserDto: RegisterUserDto): Promise<User> {
    return await this.userService.registerUser(createUserDto);
  }
  @Get()
  async listUsers(): Promise<void> {}
}
