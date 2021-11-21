import { Injectable, Logger } from '@nestjs/common';
import { AuthUser } from './interfaces/auth.interface';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  async verifyUser(email: string): Promise<AuthUser | void> {
    this.logger.log(email);
  }
}
