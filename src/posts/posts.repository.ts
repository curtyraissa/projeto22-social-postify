import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PrismaPost } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Cria um novo post
  async createPost(createPostDto: CreatePostDto): Promise<PrismaPost> {
    const { title, text, image } = createPostDto;

    return this.prisma.post.create({
      data: {
        title,
        text,
        image,
      },
    });
  }

  // Encontra um post pelo ID
  async findPostById(id: number): Promise<PrismaPost | null> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  // Atualiza um post
  async updatePost(post: PrismaPost, updatePostDto: UpdatePostDto): Promise<PrismaPost> {
    const { title, text, image } = updatePostDto;

    return this.prisma.post.update({
      where: { id: post.id },
      data: {
        title: title || post.title,
        text: text || post.text,
        image: image || post.image,
      },
    });
  }

  // Remove um post
  async removePost(post: PrismaPost): Promise<PrismaPost> {
    return this.prisma.post.delete({
      where: { id: post.id },
    });
  }

  // Retorna todos os posts
  async findAllPosts(): Promise<PrismaPost[]> {
    return this.prisma.post.findMany();
  }
}
