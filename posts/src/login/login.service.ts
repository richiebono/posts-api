import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import axios from 'axios'

@Injectable()
export class LoginService {
  constructor(
        private readonly jwtService: JwtService,
  ) {}

  private async getByEmail(email: string): Promise<UserDto> {
    return (await axios.get<UserDto>(`${process.env.USER_API}/api/user/?email=${email}`)).data;
  }

  public async login(
    loginDto: LoginDto,
  ): Promise<any | { status: number; message: string }> {
    return this.getByEmail(loginDto.email)
      .then((userData) => {
        if (!userData) {
          throw new UnauthorizedException();
        }

        const passwordIsValid = bcrypt.compareSync(
          loginDto.password,
          userData.password,
        );

        if (!passwordIsValid == true) {
          return {
            message: 'Authentication failed. Wrong password',
            status: 400,
          };
        }

        const payload = {
          name: userData.name,
          email: userData.email,
        };

        const accessToken = this.jwtService.sign(payload);
        return {
          expiresIn: 3600,
          accessToken: accessToken,
          user: payload,
          status: 200,
        };
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }

  public async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.getByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }

  protected createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt,
      user
    };
  }
}
