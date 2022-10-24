import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UserModule } from './users/user.module';
import * as Yup from 'yup';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { PostsController } from './posts/posts.controller';
import { redisStore } from 'cache-manager-redis-store';
import { PriveteRateLimitMiddleware, PublicRateLimitMiddleware } from '@richiebono/rate-limit-middleware';
import { LoginController } from './login/login.controller';
import { UserController } from './users/user.controller';
import { RegisterController } from './register/register.controller';

@Module({
  imports: [
    CacheModule.register({
      // @ts-ignore
      store: async () => await redisStore({
        socket: {
          host: 'localhost',
          port: 6379,
        }
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev', '.env.stage', '.env.prod'],
      validationSchema: Yup.object({
        MONGOOSE_HOST: Yup.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGOOSE_HOST'),
      }),
    }),
    LoginModule,
    RegisterModule,
    UserModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

// export class AppModule {}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(PriveteRateLimitMiddleware)
      .forRoutes(PostsController, UserController, AppController);
    
    consumer
      .apply(PublicRateLimitMiddleware)
      .forRoutes(LoginController, RegisterController);

    
  }
}
