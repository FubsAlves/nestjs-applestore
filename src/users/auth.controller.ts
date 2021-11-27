import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Logger,
  Req,
} from '@nestjs/common';
import { json } from 'stream/consumers';
import { AuthUserDto } from '../users/dtos/auth-user.dto';
import { RegisterUserDto } from '../users/dtos/register-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from './users.service';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  private logger = new Logger(AuthController.name);

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async Signup(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    return this.usersService.registerUser(registerUserDto);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  //@UsePipes(ValidationPipe)
  async Signin(
    @Body() authUserDto: AuthUserDto,
    @Req() req: any,
  ): Promise<any> {
    this.logger.log(req.body);
  }
}
