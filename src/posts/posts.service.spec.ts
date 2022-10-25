import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { mockedPostsList } from '../utils/test/mock/mock.posts';
import { PostsRequest } from './dto/post.requests.dto';
import { Posts } from './dto/post.dto';
import { Comments } from './dto/comments.dto';
import { postsTestModule } from './posts.test.module';
  
describe('postsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await postsTestModule.compile();

    service = module.get<PostsService>(PostsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all posts', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementationOnce(() => Promise.resolve(mockedPostsList) as any);

      const postsRequest = {
        start: 0,
        size: 1
      } as PostsRequest;

    const posts = await service.findAll(postsRequest);

    expect(posts).toStrictEqual(mockedPostsList);
  });

  it('should return empty posts', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementationOnce(() => Promise.resolve([] as Posts[]) as any);

      const postsRequest = {
        start: 0,
        size: 0
      } as PostsRequest;

    const posts = await service.findAll(postsRequest);
    
    expect(posts).toStrictEqual([]);
  });
    
});