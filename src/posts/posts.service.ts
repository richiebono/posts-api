import {
    Injectable,
    HttpException,
    HttpStatus
  } from '@nestjs/common';
  
import axios from 'axios'
import { Comments } from './dto/comments.dto';
import { Posts } from './dto/post.dto';
import { PostsRequest } from './dto/post.requests.dto'
import { Users } from './dto/users.dto';
  
  @Injectable()
  export class PostsService {
    
    public async findAll(postsRequest: PostsRequest): Promise<Posts[]> {
      
        try {
            
            const posts = (await axios.get<Posts[]>('https://jsonplaceholder.typicode.com/posts')).data.slice(postsRequest.start, postsRequest.size);
      
            if (!posts) {
                return posts;
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
            return postsResponse;

        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
        
    }   
     
  }
  