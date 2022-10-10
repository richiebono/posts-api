import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { userTestModule } from "./user.test.module";

describe("Users Controller", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await userTestModule.compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
