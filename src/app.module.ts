import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import * as Yup from 'yup';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { PostsController } from './posts/posts.controller';
import { redisStore } from 'cache-manager-redis-store';
import { PriveteRateLimitMiddleware, PublicRateLimitMiddleware, RateLimitModule, RateLimitService } from '@richiebono/rate-limit-middleware';
import { LoginController } from './login/login.controller';
import { UserModule, UserService } from '@richiebono/users-api';

@Module({
  imports: [ 
    CacheModule.register({
      // @ts-ignore
      store: async () => await redisStore({
        socket: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
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
    PostsModule,
    UserModule,
    RateLimitModule
  ],
  controllers: [AppController],
  providers: [AppService, RateLimitService],
})

// export class AppModule {}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(PriveteRateLimitMiddleware)
      .forRoutes(PostsController, AppController);
    
    consumer
      .apply(PublicRateLimitMiddleware)
      .forRoutes(LoginController);

    
  }
}
