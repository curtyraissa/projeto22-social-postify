import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediasModule } from './medias/medias.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PublicationModule } from './publications/publications.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [MediasModule, PostsModule, PublicationModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
