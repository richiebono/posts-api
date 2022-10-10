import { TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { registerTestModule } from './register.test.module';

describe('Register Controller', () => {
  let controller: RegisterController;

  beforeEach(async () => {
    const module: TestingModule = await registerTestModule.compile();
    controller = module.get<RegisterController>(RegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
