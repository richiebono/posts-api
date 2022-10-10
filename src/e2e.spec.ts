import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PostsModule } from './posts/posts.module';
import { INestApplication } from '@nestjs/common';
import { UserDto } from './users/dto/user.dto';
import { LoginDto } from './login/dto/login.dto';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { rootMongooseTestModule } from './test-utils/mongo/MongooseTestModule';
import { ConfigModule } from '@nestjs/config';
import * as Yup from 'yup';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsRequest } from './posts/dto/post.requests.dto';
import { Posts } from './posts/dto/post.dto';

describe('Posts', () => {
  let app: INestApplication;
  let PostsService = { findAll: (postsRequest: PostsRequest) => [
    {
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      "userId": 1,
      "user": {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      "comments": [
        {
          "postId": 1,
          "id": 1,
          "name": "id labore ex et quam laborum",
          "email": "Eliseo@gardner.biz",
          "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        },
        {
          "postId": 1,
          "id": 2,
          "name": "quo vero reiciendis velit similique earum",
          "email": "Jayne_Kuhic@sydney.com",
          "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
        },
        {
          "postId": 1,
          "id": 3,
          "name": "odio adipisci rerum aut animi",
          "email": "Nikita@garfield.biz",
          "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
        },
        {
          "postId": 1,
          "id": 4,
          "name": "alias odio sit",
          "email": "Lew@alysha.tv",
          "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
        },
        {
          "postId": 1,
          "id": 5,
          "name": "vero eaque aliquid doloribus et culpa",
          "email": "Hayden@althea.biz",
          "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
        }
      ]
    }
  ] };
  
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
        PostsModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET Posts`, async () => {

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

    return await request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', `Bearer ${jwtToken}`)
      .query(mockPostsRequest)
      .expect(200)
      .expect({
        status: 200,
        data: PostsService.findAll(mockPostsRequest),
      });
      
  });

  afterAll(async () => {
    await app.close();
  });
});