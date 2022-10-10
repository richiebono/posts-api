import { Test } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';

import { Response } from 'express';
import { createMock } from '@golevelup/ts-jest';
import { PostsRequest } from './dto/post.requests.dto';
import { mockUser, mockedpostsList } from './utils/mock'

const mockResponseObject = () => {
  return createMock<Response>({
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  });
};

describe('posts Controller', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [       
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            findAll: jest.fn(),
            
          },
        },
        PostsService,
        
      ],
    }).compile();

    postsController = moduleRef.get<PostsController>(PostsController);
    postsService = moduleRef.get<PostsService>(PostsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should return an array of posts', async () => {
    const response = mockResponseObject();

    jest
      .spyOn(postsService, 'findAll')
      .mockImplementation(jest.fn().mockResolvedValueOnce(mockedpostsList));

      const postsRequest = {
        start: 0,
        size: 1
      } as PostsRequest;

    const postsResponse = await postsController.findAll(response, postsRequest);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ status: 200, data: mockedpostsList });
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
  });

});