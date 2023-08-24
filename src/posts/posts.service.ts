import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostRepository } from './posts.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postRepository: PostRepository,
  ) {}

  // Cria um novo post
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { title, text, image } = createPostDto;

    // Validação dos campos obrigatórios
    if (!title || !text) {
      throw new HttpException('Title and text are required', HttpStatus.BAD_REQUEST);
    }

    return this.postRepository.createPost(createPostDto);
  }

  // Retorna todos os posts
  async findAll(): Promise<Post[]> {
    return this.postRepository.findAllPosts();
  }

  // Retorna um post pelo ID
  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findPostById(id);

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  // Atualiza um post pelo ID
  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const existingPost = await this.postRepository.findPostById(id);

    if (!existingPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    // Validação das mudanças
    if (!updatePostDto.title && !updatePostDto.text && !updatePostDto.image) {
      throw new HttpException('No changes provided', HttpStatus.BAD_REQUEST);
    }

    return this.postRepository.updatePost(existingPost, updatePostDto);
  }

  // Remove um post pelo ID
  async remove(id: number): Promise<void> {
    const existingPost = await this.postRepository.findPostById(id);

    if (!existingPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    await this.postRepository.removePost(existingPost);
  }
}
