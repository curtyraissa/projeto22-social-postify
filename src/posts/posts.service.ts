// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Post } from './entities/post.entity';
// import { CreatePostDto } from './dto/create-post.dto';
// import { Repository } from 'typeorm';

// @Injectable()
// export class PostsService {
//   constructor(
//     @InjectRepository(Post)
//     private postRepository: Repository<Post>,
//   ) {}

//   // Função para criar um novo post
//   async create(createPostDto: CreatePostDto): Promise<Post> {
//     const { title, text, image } = createPostDto;
    
//     // Verifica se os campos obrigatórios foram fornecidos
//     if (!title || !text) {
//       throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
//     }

//     // Cria um novo post e o salva no banco de dados
//     const post = this.postRepository.create({ title, text, image });
//     await this.postRepository.save(post);

//     return post;
//   }

//   findAll() {
//     return `This action returns all posts`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} post`;
//   }

//   // update(id: number, updatePostDto: UpdatePostDto) {
//   //   return `This action updates a #${id} post`;
//   // }

//   remove(id: number) {
//     return `This action removes a #${id} post`;
//   }
// }
