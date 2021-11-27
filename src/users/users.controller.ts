import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  private logger = new Logger(UsersController.name);
  @Get()
  async listUsers(): Promise<User[] | string> {
    const userList: User[] = await this.userService.listUsers();
    return userList;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  async listUser(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<User> {
    return await this.userService.findUserById(_id);
  }

  @Patch('/:_id')
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
