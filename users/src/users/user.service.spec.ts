import { TestingModule } from "@nestjs/testing";
import { User, UserDocument } from "./schemas/user.model";
import { UserService } from "./user.service";
import { userTestModule } from "./user.test.module";
import { createMock } from '@golevelup/ts-jest';
import { Model, Types } from 'mongoose';
import { UserDto } from "./dto/user.dto";

describe("UserService", () => {
  let service: UserService;
  let userRepository: Model<UserDocument>;
  let expected = [{}] as User[];
  var idMocked = new Types.ObjectId().toString();
  var userMocked = createMock<User>({id: idMocked, name: "someName", password: "somePassword", email: "someEmail"}) as User;
  var userListMocked = [userMocked] as User[];
  beforeEach(async () => {
    const module: TestingModule = await userTestModule.compile();
    userRepository = createMock<Model<UserDocument>>({
      find: jest.fn().mockResolvedValueOnce(Promise.resolve(userListMocked)),
      findOne: jest.fn().mockResolvedValueOnce(Promise.resolve(userMocked)),
      findById: jest.fn().mockResolvedValueOnce(Promise.resolve(userMocked)),
      create: jest.fn().mockResolvedValueOnce(Promise.resolve(userMocked)),
      findOneAndUpdate: jest.fn().mockResolvedValueOnce(Promise.resolve(userMocked)),      
      remove: jest.fn()
    });
    service = new UserService(userRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all users", async () => {    
    expect(await service.findAll()).toStrictEqual(userListMocked);
  });

  it("should create and return a users", async () => {    
    expect(await service.create(userMocked as UserDto)).toStrictEqual(userMocked);
  }); 
  
  it("should return by email", async () => {    
    expect(await service.findByEmail("someEmail")).toStrictEqual(userMocked);
  });

  it("should return by id", async () => {
    expect(await service.findById(idMocked)).toStrictEqual(userMocked);
  });

  it("Shoud update by email.", async () => {
    expect(await service.updateByEmail("someEmail")).toStrictEqual(userMocked);
  });

  it("Shoud update by password.", async () => {
    expect(await service.updateByPassword(idMocked, "somePassword")).toStrictEqual(userMocked);    
  });

  it("Shoud delete user.", async () => {
    expect(await service.deleteUser(idMocked));
  });

});