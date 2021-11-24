import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  private logger = new Logger(UsersController.name);
  @Post('/signup')
  @UsePipes(ValidationPipe)
  async UserRegister(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    this.logger.log(registerUserDto);
    return await this.userService.registerUser(registerUserDto);
  }
  @Get()
  async listUsers(): Promise<User[] | string> {
    const userList: User[] = await this.userService.listUsers();
    return userList;
  }

  @Get('/:_id')
  async listUser(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<User> {
    return await this.userService.findUser(_id);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    return await this.userService.updateUser(_id, updateUserDto);
  }
  @Delete('/:_id')
  async deleteUser(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    await this.userService.deleteUser(_id);
    return this.logger.log('User has been deleted!');
  }
}
