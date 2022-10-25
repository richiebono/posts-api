import { TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { loginTestModule } from './login.test.module';

describe('Login Controller', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await loginTestModule.compile();
    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
