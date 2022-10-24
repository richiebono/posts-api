import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { loginTestModule } from './login.test.module'

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await loginTestModule.compile();
    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});