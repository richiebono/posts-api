import { HttpService } from '@nestjs/axios';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Posts } from './dto/post.dto'
import { ApiTags } from '@nestjs/swagger';
import { AxiosResponse } from 'axios'
import { Users } from './dto/users.dto';
import { map, Observable } from 'rxjs';

@ApiTags('users')
@Controller('posts')
export class PostsController {
  
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<Posts[]>> {
    return this.httpService.get('http://localhost:3000/cats').pipe(map((res) => res.data));
   
  }

  // // @Get()
  // // async findAll(): Promise<AxiosResponse<Posts[]>> {
    

  // //   const posts = await this.httpService.get<Posts>('https://jsonplaceholder.typicode.com/posts').pipe {

  // //   })
    
  // //   posts.map((item) => {
  // //     const users = await this.httpService.get<Users>('https://jsonplaceholder.typicode.com/users').filter(x=> x.)

  // //   })
    
    

  // }

}
