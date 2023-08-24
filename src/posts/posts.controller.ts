// import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
// import { PostsService } from './posts.service';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';

// @Controller('posts')
// export class PostsController {
//   constructor(private readonly postsService: PostsService) {}

//   // Endpoint para criar um novo post
//   @Post()
//   async create(@Body() createPostDto: CreatePostDto) {
//     // Verifica se os campos obrigatórios foram fornecidos
//     if (!createPostDto.title || !createPostDto.text) {
//       throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
//     }
    
//     // Chama o serviço para criar o post
//     return this.postsService.create(createPostDto);
//   }

//   @Get()
//   findAll() {
//     return this.postsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.postsService.findOne(+id);
//   }

//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
//   //   return this.postsService.update(+id, updatePostDto);
//   // }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.postsService.remove(+id);
//   }
// }
