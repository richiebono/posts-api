import { Test } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';

import { Response } from 'express';
import { createMock } from '@golevelup/ts-jest';
import { PostsRequest } from './dto/post.requests.dto';
import { mockUser, mockedPostsList } from '../utils/test/mock/mock.posts'
import { Posts } from './dto/post.dto';
import { postsTestModule } from './posts.test.module';
import { HttpException, HttpStatus } from '@nestjs/common';

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
    const moduleRef = await postsTestModule.compile();

    postsController = moduleRef.get<PostsController>(PostsController);
    postsService = moduleRef.get<PostsService>(PostsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should return an array of posts', async () => {
    const response = mockResponseObject();

    jest
      .spyOn(postsService, 'findAll')
      .mockImplementation(jest.fn().mockResolvedValueOnce(mockedPostsList as Posts[]));

      const postsRequest = {
        start: 0,
        size: 1
      } as PostsRequest;

    await postsController.findAll(response, postsRequest);    
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({ status: 200, data: mockedPostsList });
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
  });

  it('should return an error', async () => {
    const response = mockResponseObject();

    jest
      .spyOn(postsService, 'findAll')
      .mockImplementation(jest.fn().mockRejectedValue(new Error("Error")));

      const postsRequest = {
        start: 0,
        size: 1
      } as PostsRequest;

    const expectedError = { 
      status: 500, 
      message: 'Error: Internal Server Error!', 
      error: new Error("Error") 
    }

    await postsController.findAll(response, postsRequest);    
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(expectedError);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(500);
  });

});