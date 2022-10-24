import { Request } from 'express';
import { createMock } from '@golevelup/ts-jest';
import { User } from 'src/users/schemas/user.model';

export const mockRequestObject = () => {
    return createMock<Request>({
      user: {} as User
    });
  };