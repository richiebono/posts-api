import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../utils/test/mongo/mongoose.test.module';
import { registerTestModule } from './register.test.module';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await registerTestModule.compile();
    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
