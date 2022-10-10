import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { UserProfileDto } from './dto/user-profile.dto';
import { User, UserDocument } from './schemas/user.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  
  constructor(@InjectModel(User.name) private userRepository: Model<UserDocument>) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email: email });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }

  public async findById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(new Types.ObjectId(userId));

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return user;
  }

  public async create(userDto: UserDto): Promise<User> {
    try {
      return await this.userRepository.create(userDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ email: email });
      user.password = bcrypt.hashSync(Math.random().toString(36).slice(-8), 8);

      return await this.userRepository.findOneAndUpdate(user as User);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateByPassword(
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ email: email });
      user.password = bcrypt.hashSync(password, 8);

      return await this.userRepository.findOneAndUpdate(user as User);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateProfileUser(
    id: string,
    userProfileDto: UserProfileDto,
  ): Promise<User> {
    try {
      const user = await this.findById(id);
      user.name = userProfileDto.name;
      user.email = userProfileDto.email;
      user.updated_at= new Date();;
      return await this.userRepository.findOneAndUpdate(user as User);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteUser(idUser: string): Promise<void> {
    const user = await this.findById(idUser);
    await this.userRepository.remove(user);
  }
   
}
