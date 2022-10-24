import { Test, TestingModule } from "@nestjs/testing";
import { mockResponseObject } from "../utils/test/mock/mock.response";
import { User } from "./schemas/user.model";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userTestModule } from "./user.test.module";
import { createMock } from '@golevelup/ts-jest';
import { Types } from "mongoose";
import { NotFoundException } from "@nestjs/common";

describe("Users Controller", () => {
  let controller: UserController;
  let service: UserService;
  let idMocked = new Types.ObjectId().toString();
  let userMocked = createMock<User>({id: idMocked, name: "someName", password: "somePassword", email: "someEmail"}) as User;
  let userListMocked = [userMocked] as User[];

  beforeEach(async () => {
    const module: TestingModule = await userTestModule.compile();
    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of user', async () => {

    jest
      .spyOn(service, 'findAll')
      .mockImplementation(jest.fn().mockResolvedValueOnce(userListMocked));

    expect(await controller.findAllUser()).toStrictEqual(userListMocked);
  });

  it('should return one user', async () => {

    jest
      .spyOn(service, 'findById')
      .mockImplementation(jest.fn().mockResolvedValueOnce(userMocked));

    expect(await controller.findOneUser(idMocked)).toStrictEqual(userMocked);
  });

  it('should delete user', async () => {

    jest
      .spyOn(service, 'deleteUser')
      .mockImplementation(jest.fn().mockResolvedValueOnce(userMocked));

    expect(await controller.deleteUser(idMocked));
  });

});
