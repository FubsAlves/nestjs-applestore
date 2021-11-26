import { Injectable } from '@nestjs/common';
import { AuthUserDto } from './dtos/auth-user.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async authenticateUser(authUserDto: AuthUserDto): Promise<any> {
    const user = await this.usersService.findUserByEmail(authUserDto.email);
  }
}
