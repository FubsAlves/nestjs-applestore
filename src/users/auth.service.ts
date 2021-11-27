import { Injectable, Logger } from '@nestjs/common';
import { AuthUserDto } from './dtos/auth-user.dto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private logger = new Logger(AuthService.name);
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if(user && )
    return user;
  }
  async login(user) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
