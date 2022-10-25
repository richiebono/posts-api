import { Injectable } from '@nestjs/common';
  
import axios from 'axios'
import { Comments } from './dto/comments.dto';
import { Posts } from './dto/post.dto';
import { PostsRequest } from './dto/post.requests.dto'
import { Users } from './dto/users.dto';
  
  @Injectable()
  export class PostsService {
    
    public async findAll(postsRequest: PostsRequest): Promise<Posts[]> {
      
        const posts = (await axios.get<Posts[]>(process.env.JSON_PLACE_HOLDER_POST_API)).data.slice(postsRequest.start, postsRequest.size);
      
            if (posts.length === 0) {
                return posts;
            }

            const users = (await axios.get<Users[]>(process.env.JSON_PLACE_HOLDER_USER_API)).data;      
            var comments = async (post) => (await axios.get<Comments[]>(`${process.env.JSON_PLACE_HOLDER_POST_API}/${ post.id }/comments`)).data;

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
    }   
     
  }
  