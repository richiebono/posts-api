import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.model';
import { UserService } from '../users/user.service';
import { RegisterController } from './register.controller';
import { rootMongooseTestModule } from '../utils/test/mongo/MongooseTestModule';
import { RegisterService } from './register.service';

export const registerTestModule = Test.createTestingModule({
  imports: [
            rootMongooseTestModule(), 
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
          ],
  controllers: [RegisterController],
  providers: [RegisterService, UserService],
});
