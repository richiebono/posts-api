import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { mockUser, mockedpostsList } from './utils/mock'
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
            new: jest.fn().mockResolvedValue(mockedpostsList),
            constructor: jest.fn().mockResolvedValue(mockedpostsList),
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
      .mockImplementationOnce(() => Promise.resolve(mockedpostsList) as any);

      const postsRequest = {
        start: 0,
        size: 1
      } as PostsRequest;

    const posts = await service.findAll(postsRequest);

    expect(posts).toStrictEqual(mockedpostsList);
  });

  
});