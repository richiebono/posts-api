
import { Controller, Get, UseGuards, HttpStatus, Res, Query, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostsRequest } from './dto/post.requests.dto';
import { Posts } from './dto/post.dto'
import { PostsService } from './posts.service';

@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
    
  @Inject(PostsService)
  private readonly postsService: PostsService;

  @Get()
  async findAll(
    @Res() res,    
    @Query() postsRequest: PostsRequest, 
  ): Promise<Posts[]> {
    try {
      const posts = await this.postsService.findAll(postsRequest);      
      if (posts && posts.length == 0) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: 404,          
          message: 'Error: User not found!',           
        });
      }

      return res.status(HttpStatus.OK).json({
        status: 200,
        data: posts
        
      });

    }
    catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        message: 'Error: Internal Server Error!',        
        error: err
      });
    }   
  }
}
