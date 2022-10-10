import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../users/user.service';
import { User, UserSchema } from '../users/schemas/user.model';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../test-utils/mongo/MongooseTestModule';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
                rootMongooseTestModule(), 
                MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
              ],
      controllers: [RegisterController],
      providers: [RegisterService, UserService],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
