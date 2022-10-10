import { TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { userTestModule } from "./user.test.module";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await userTestModule.compile();
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
