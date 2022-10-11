import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedPostsList } from '../utils/test/mock/mock.posts';
import { Comments } from './dto/comments.dto';
import { Posts } from './dto/post.dto';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

export const postsTestModule = Test.createTestingModule({
  imports: [Posts, Comments, HttpModule],
  controllers: [PostsController],
  providers: [
    PostsService,        
    {
      provide: getModelToken('Posts'),
      useValue: {
        new: jest.fn().mockResolvedValue(mockedPostsList),
        constructor: jest.fn().mockResolvedValue(mockedPostsList),
        findAll: jest.fn(),
      },
    },
    
  ],
});
