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

  async listUsers(): Promise<User[]> {
    const userList = this.userModel.find().exec();
    return userList;
  }
  async findUserById(_id: string): Promise<User> {
    const userFound = this.userModel
      .findById({ _id })
      .select('-password -createdAt -updatedAt')
      .exec();
    if (!userFound) throw new NotFoundException(`Invalid user!`);
    return userFound;
  }
  async findUserByUsername(username: string): Promise<User> {
    const userExists = await this.userModel
      .findOne({ username })
      .select('_id username password')
      .exec();
    if (!userExists) throw new NotFoundException(`Invalid User`);
    this.logger.log(userExists);
    return userExists;
  }

  async findUserByEmail(email: string): Promise<User> {
    const userExists = await this.userModel
      .findOne({ email })
      .select('_id email password')
      .exec();
    if (!userExists) throw new NotFoundException(`Invalid User`);
    this.logger.log(userExists);
    return userExists;
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
