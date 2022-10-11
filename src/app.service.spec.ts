import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UserModule } from './users/user.module';
import * as Yup from 'yup';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { Test } from '@nestjs/testing';
import { TestingModule } from "@nestjs/testing";
import { rootMongooseTestModule } from './utils/test/mongo/mongoose.test.module';

describe("UserService", () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

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
      providers: [AppService]

      
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
