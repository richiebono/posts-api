import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { postsTestModule } from './posts.test.module';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await postsTestModule.compile();
    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
