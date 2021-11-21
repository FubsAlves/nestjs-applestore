import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthUser } from './interfaces/auth.interface';
import { User } from './interfaces/user.interface';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  private logger = new Logger(UsersService.name);

  async registerUser(registerUserDto: RegisterUserDto): Promise<any> {
    const { username, email, phoneNumber } = registerUserDto;
    const usernameExists = await this.userModel.findOne({ username }).exec();
    if (usernameExists) {
      throw new BadRequestException(`Username: ${username} exists!`);
    }

    const emailExists = await this.userModel.findOne({ email }).exec();
    if (emailExists) {
      throw new BadRequestException(`Email: ${email} exists!`);
    }

    const phoneNumberExists = await this.userModel
      .findOne({ phoneNumber })
      .exec();
    if (phoneNumberExists) {
      throw new BadRequestException(`Phone number: ${phoneNumber} exists!`);
    }

    registerUserDto.password = await argon2.hash(registerUserDto.password, {
      type: argon2.argon2id,
      hashLength: 64,
      saltLength: 128,
    });
    const createdUser = new this.userModel(registerUserDto);
    return await createdUser.save();
  }
}
