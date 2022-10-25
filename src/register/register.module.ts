import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, UserService } from '@richiebono/users-api';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [RegisterController],
  providers: [RegisterService, UserService],
})
export class RegisterModule {}