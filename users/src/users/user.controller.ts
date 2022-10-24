import {
  Controller,
  Put,
  Get,
  Body,
  Res,
  Param,
  UseGuards,
  HttpStatus,
  NotFoundException,
  Delete,
  Inject,
  Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schemas/user.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  
  @Inject(UserService)
  private readonly userService: UserService;

  @Get()
  public async findAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:userId')
  public async findOneUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.findById(userId);
  }
 

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);   
  }
}
