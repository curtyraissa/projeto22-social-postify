import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PostRepository } from './posts.repository';
import { PublicationModule } from '../publications/publications.module';

@Module({
  controllers: [PostsController],
  providers: [PostService, PostRepository],
  exports: [PostService],
  imports: [PrismaModule, forwardRef(()=> PublicationModule)],
})
export class PostsModule {}
