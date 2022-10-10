import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { rootMongooseTestModule } from '../test-utils/mongo/MongooseTestModule';

export const userTestModule = Test.createTestingModule({
  imports: [
            rootMongooseTestModule(), 
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
          ],
  controllers: [UserController],
  providers: [UserService],
});
