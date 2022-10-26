/* istanbul ignore file */ 
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Yup from 'yup';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { PostsController } from './posts/posts.controller';

import { PriveteRateLimitMiddleware, PublicRateLimitMiddleware, RateLimitModule, RateLimitService, configureRateLimitCacheModule } from '@richiebono/rate-limit-middleware';
import { LoginController, LoginModule, RegisterModule } from '@richiebono/users-api';

@Module({
  imports: [ 
    configureRateLimitCacheModule(),   
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
    PostsModule,
    RateLimitModule
  ],
  controllers: [AppController],
  providers: [AppService, RateLimitService],
})

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
