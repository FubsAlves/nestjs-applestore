import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AuthUser } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  private logger = new Logger(AuthService.name);
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    try {
      if (
        user &&
        (await argon2.verify(user.password, password, {
          type: argon2.argon2id,
          memoryCost: 131072,
          hashLength: 64,
          saltLength: 128,
        }))
      ) {
        delete user['password'];
        this.logger.log(user);
        return user;
      } else {
        return null;
      }
    } catch (err) {
      return err;
    }
  }
  async login(user) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createToken(user: AuthUser) {
    const { _id, email, username, firstName, surname } = user;

    return {
      access_token: this.jwtService.sign({
        sub: _id,
        email,
        username,
        firstName,
        surname,
      }),
    };
  }
}
