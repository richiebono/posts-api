import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UserModule } from './users/user.module';
import * as Yup from 'yup';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-store';
import { PriveteRateLimitMiddleware, PublicRateLimitMiddleware, RateLimitModule, RateLimitService } from '@richiebono/rate-limit-middleware';
import { LoginController } from './login/login.controller';
import { UserController } from './users/user.controller';
import { RegisterController } from './register/register.controller';

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
    RegisterModule,
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
      .forRoutes(UserController, AppController);
    
    consumer
      .apply(PublicRateLimitMiddleware)
      .forRoutes(LoginController, RegisterController);   
  }
}
