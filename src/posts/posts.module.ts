import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

@Module({
  imports: [HttpModule],
  controllers: [PostsController], 
})
export class PostsModule {}
