import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserDto } from './users/dto/user.dto';
import { LoginDto } from './login/dto/login.dto';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { rootMongooseTestModule } from './utils/test/mongo/mongoose.test.module';
import { ConfigModule } from '@nestjs/config';
import * as Yup from 'yup';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mockedPostsList } from './utils/test/mock/mock.posts';
import { AppModule } from './app.module';
describe('Posts', () => {
  let app: INestApplication;
  
  const mockUser: UserDto = {
    name: 'name',
    email: 'updateEmail@gmail.com',
    password: 'password1',
  };
  
  const mockLoginUser: LoginDto = {
    email: 'updateEmail@gmail.com',
    password: 'password1',
  };


  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
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
        AppModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET Posts `, async () => {

    const test = await request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');

    const responseRegister = await request(app.getHttpServer())
    .post('/auth/register/')
    .send(mockUser)
    .expect(200);
    
    const responseLogin = await request(app.getHttpServer())
    .post('/auth/login')
    .send(mockLoginUser)
    .expect(201);

    // save the access token for subsequent tests
    const jwtToken = responseLogin.body.accessToken

    // const ok = await request(app.getHttpServer())
    //   .get('/posts')
    //   .set('Authorization', `Bearer ${jwtToken}`)
    //   .query(mockPostsRequest)
    //   .expect(200)
    //   .expect({
    //     status: 200,
    //     data: PostsService.findAll(mockPostsRequest),
    //   });    
      
  });


  afterAll(async () => {
    await app.close();
  });
});