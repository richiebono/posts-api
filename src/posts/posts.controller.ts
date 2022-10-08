import axios from 'axios'
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, HttpStatus, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostsRequest } from './dto/post.requests.dto';
import { Posts } from './dto/post.dto'
import { Users } from './dto/users.dto';
import { Comments } from './dto/comments.dto';

@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
    
  @Post()
  async findAll(
    @Res() res,    
    @Body() postsRequest: PostsRequest, 
  ): Promise<any> {
    try {
      
      const posts = (await axios.get<Posts[]>('https://jsonplaceholder.typicode.com/posts')).data.slice(postsRequest.start, postsRequest.size);
      
      if (!posts) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 404,          
          message: 'Error: User not found!',           
        });
      }

      const users = (await axios.get<Users[]>('https://jsonplaceholder.typicode.com/users')).data;      
      var comments = async (post) => (await axios.get<Comments[]>(`https://jsonplaceholder.typicode.com/posts/${ post.id }/comments`)).data;

      const postsResponse = await Promise.all(
        posts.map(async (post) => 
          (
              {
                id: post.id,
                title: post.title,
                body: post.body,
                userId: post.userId,
                user: users.find(t2 => t2.id === post.userId), 
                comments: [...await comments(post)]
              }
          )
        )
      ); 

      return res.status(HttpStatus.OK).json({
        status: 200,
        data: postsResponse
        
      });

    }
    catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 500,
        message: 'Error: Bad Request!',        
        err
      });
    }   
  }
}
