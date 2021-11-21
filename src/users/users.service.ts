import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthUser } from './interfaces/auth.interface';
import { User } from './interfaces/user.interface';

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

    const createdUser = new this.userModel(registerUserDto);
    return await createdUser.save();
  }
}
