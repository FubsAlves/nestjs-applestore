import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dtos/register-user.dto';
import { User } from './interfaces/user.interface';
import * as argon2 from 'argon2';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthUserDto } from './dtos/auth-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  private logger = new Logger(UsersService.name);

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
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
      memoryCost: 131072,
      hashLength: 64,
      saltLength: 128,
    });
    const createdUser = new this.userModel(registerUserDto);
    return await createdUser.save();
  }
  async authenticateUser(authUserDto: AuthUserDto): Promise<any> {
    this.logger.log(authUserDto);
  }

  async listUsers(): Promise<User[]> {
    const userList = this.userModel.find().exec();
    return userList;
  }
  async findUser(_id: string): Promise<User> {
    const userFound = this.userModel
      .findById({ _id })
      .select('-password -createdAt -updatedAt -__v')
      .exec();
    if (!userFound) throw new NotFoundException(`Invalid user!`);
    return userFound;
  }

  async updateUser(_id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const UserExists = await this.userModel
      .findById({ _id })
      .select('_id')
      .exec();
    if (!UserExists) throw new NotFoundException(`User not found!`);
    UserExists.update({ $set: updateUserDto });
  }
  async deleteUser(_id: string): Promise<void> {
    const userExists = await this.userModel.findByIdAndDelete({ _id }).exec();
    if (!userExists) throw new NotFoundException(`User not found!`);
  }
}
