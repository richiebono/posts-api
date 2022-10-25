import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterController } from './register.controller';
import { rootMongooseTestModule } from '../utils/test/mongo/mongoose.test.module';
import { RegisterService } from './register.service';
import { User, UserSchema, UserService } from '@richiebono/users-api';

export const registerTestModule = Test.createTestingModule({
  imports: [
            rootMongooseTestModule(), 
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
          ],
  controllers: [RegisterController],
  providers: [RegisterService, UserService],
});
