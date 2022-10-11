import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UserModule } from './users/user.module';
import * as Yup from 'yup';
import { PostsModule } from './posts/posts.module';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from './utils/test/mongo/mongoose.test.module';
import { mockRequestObject } from './utils/test/mock/mock.request';
import { User } from './users/schemas/user.model';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env', '.env.dev', '.env.stage', '.env.prod'],
          validationSchema: Yup.object({
            MONGOOSE_HOST: Yup.string().required(),
          }),
        }),
        rootMongooseTestModule(),
        LoginModule,
        RegisterModule,
        UserModule,
        PostsModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return UserInfo', () => {
      const req = mockRequestObject()
      expect(appController.getUserInfo(req)).toStrictEqual({} as User);
    });
  });
});
