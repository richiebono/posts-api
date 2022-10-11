import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PostsModule } from '../src/posts/posts.module';
import { INestApplication } from '@nestjs/common';
import { UserDto } from '../src/users/dto/user.dto';
import { LoginDto } from '../src/login/dto/login.dto';
import { LoginModule } from '../src/login/login.module';
import { RegisterModule } from '../src/register/register.module';
import { rootMongooseTestModule } from '../src/utils/test/mongo/mongoose.test.module';
import { ConfigModule } from '@nestjs/config';
import * as Yup from 'yup';
import { UserModule } from '../src/users/user.module';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { PostsRequest } from '../src/posts/dto/post.requests.dto';
import { mockedPostsList } from '../src/utils/test/mock/mock.posts';
import { AppModule } from '../src/app.module';
describe('Posts', () => {
  let app: INestApplication;
  
  let PostsService = { findAll: (postsRequest: PostsRequest) => [...mockedPostsList] };
  
  const mockUser: UserDto = {
    name: 'name',
    email: 'updateEmail@gmail.com',
    password: 'password1',
  };
  
  const mockLoginUser: LoginDto = {
    email: 'updateEmail@gmail.com',
    password: 'password1',
  };

  const mockPostsRequest: PostsRequest = {
    start: 0,
    size: 1
  };

  const mockPostsRequest404: PostsRequest = {
    start: 0,
    size: 0
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
        PostsModule,
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

    const ok = await request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', `Bearer ${jwtToken}`)
      .query(mockPostsRequest)
      .expect(200)
      .expect({
        status: 200,
        data: PostsService.findAll(mockPostsRequest),
      });

    const status400 = await request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', `Bearer ${jwtToken}`)
      .query(mockPostsRequest404)
      .expect(404)
      .expect({
        status: 404,          
        message: 'Error: User not found!'
      });
      
  });


  afterAll(async () => {
    await app.close();
  });
});