import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  private logger = new Logger(LocalStrategy.name);

  async validate(@Req() req: any): Promise<any> {
    const user = await this.authService.validateUser(
      req.username,
      req.password,
    );
    this.logger.log(req);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
