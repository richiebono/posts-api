import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from '../login/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('users/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  public async doLogin(@Body() loginDto: LoginDto): Promise<any> {
    
    const ret = await this.loginService.login(loginDto);
    return ret;
  }
}
