import { Response } from 'express';
import { createMock } from '@golevelup/ts-jest';

export const mockResponseObject = () => {
    return createMock<Response>({
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    });
  };