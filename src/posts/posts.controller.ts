import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  // Cria um novo post
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    if (!createPostDto.title || !createPostDto.text) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }

    return this.postService.create(createPostDto);
  }

  // Retorna todos os posts
  @Get()
  findAll() {
    const posts = this.postService.findAll();
    return posts;
  }

  // Retorna um post pelo ID
  @Get(':id')
  async findOne(@Param('id') id: string){
    try {
      const post = await this.postService.findOne(+id);
      return post;
    } catch (error) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  // Atualiza um post pelo ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      const updatedPost = await this.postService.update(+id, updatePostDto);
      return updatedPost;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  // Remove um post pelo ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const postId = +id;
    await this.postService.remove(postId);
  }
}
