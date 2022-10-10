import { TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { postsTestModule } from './posts.test.module';

describe('PostsController', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await postsTestModule.compile();
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
