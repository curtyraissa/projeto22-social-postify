// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { PublicationRepository } from './publications.repository';
// import { MediasService } from '../medias/medias.service';
// import { PostsService } from '../posts/posts.service';

// @Injectable()
// export class PublicationsService {
//   constructor(
//     @InjectRepository(PublicationRepository)
//     private publicationRepository: PublicationRepository,
//     private mediasService: MediasService,
//     private postsService: PostsService,
//   ) {}

//   async createPublication(mediaId: number, postId: number, date: Date) {
//     const existingMedia = await this.mediasService.findOne(mediaId);
//     const existingPost = await this.postsService.findOne(postId);

//     if (!existingMedia || !existingPost) {
//       throw new HttpException('Media or Post not found', HttpStatus.NOT_FOUND);
//     }

    // Implementar aqui a verificação se o post está associado a publicações
    // Se estiver, lance uma ConflictException
    // Caso contrário, crie a publicação

//     const newPublication = this.publicationRepository.create({
//       media: existingMedia,
//       post: existingPost,
//       date,
//     });

//     return this.publicationRepository.save(newPublication);
//   }
// }

//   findAll() {
//     return `This action returns all publications`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} publication`;
//   }

//   update(id: number, updatePublicationDto: UpdatePublicationDto) {
//     return `This action updates a #${id} publication`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} publication`;
//   }
// }
