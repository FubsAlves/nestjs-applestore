import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthUserDto } from '../users/dtos/auth-user.dto';
import { RegisterUserDto } from '../users/dtos/register-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Controller('api/v1')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async Signup(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    return this.usersService.registerUser(registerUserDto);
  }
  @Post('/signin')
  @UsePipes(ValidationPipe)
  async Signin(@Body() authUserDto: AuthUserDto): Promise<any> {
    return this.authService.authenticateUser(authUserDto);
  }
}
