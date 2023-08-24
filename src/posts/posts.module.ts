import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostRepository } from './posts.repository';

@Module({
  controllers: [PostsController],
  providers: [PostService, PostRepository],
  exports: [PostService],
  imports: [PrismaModule],
})
export class PostsModule {}
