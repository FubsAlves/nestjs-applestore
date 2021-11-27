import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Logger,
  Request,
} from '@nestjs/common';
import { RegisterUserDto } from '../users/dtos/register-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Controller('api/v1')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  private logger = new Logger(AuthController.name);

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async Signup(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    const user = await this.usersService.registerUser(registerUserDto);
    return this.authService.createToken(user);
  }
  @Post('/signin')
  //@UsePipes(ValidationPipe)
  async Signin(@Request() request): Promise<any> {
    return this.authService.createToken(request.user);
  }
}
