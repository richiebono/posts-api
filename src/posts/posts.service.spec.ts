import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { mockedPostsList } from '../utils/test/mock/mock.posts';
import { PostsRequest } from './dto/post.requests.dto';
  
describe('postsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

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

  
});