import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { rootMongooseTestModule } from "../test-utils/mongo/MongooseTestModule";
import { User, UserSchema } from "./schemas/user.model";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
                rootMongooseTestModule(), 
                MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
              ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
