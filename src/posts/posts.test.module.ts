import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

export const postsTestModule = Test.createTestingModule({
  imports: [HttpModule],
  controllers: [PostsController],     
  providers: [PostsService]
});
