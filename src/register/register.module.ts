import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { UserService } from '../users/user.service';
import { User, UserSchema } from '../users/schemas/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [RegisterController],
  providers: [RegisterService, UserService],
})
export class RegisterModule {}