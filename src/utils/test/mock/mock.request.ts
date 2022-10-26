import { Request } from 'express';
import { createMock } from '@golevelup/ts-jest';
import { UserDto } from '@richiebono/users-api';

export const mockRequestObject = () => {
    return createMock<Request>({
      user: { user: {email: "", name: "" } as UserDto }
    });
  };