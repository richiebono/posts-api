import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import * as Yup from 'yup';
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
