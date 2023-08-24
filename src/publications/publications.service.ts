import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PublicationRepository } from './publications.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from '@prisma/client';

@Injectable()
export class PublicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly publicationRepository: PublicationRepository,
  ) {}

  async create(createPublicationDto: CreatePublicationDto): Promise<Publication> {
    const { mediaId, postId, date } = createPublicationDto;

    if (!mediaId || !postId || !date) {
      throw new HttpException('MediaId, postId and date are required', HttpStatus.BAD_REQUEST);
    }

    // Verificar se a mídia existe
    const existingMedia = await this.prisma.media.findUnique({ where: { id: mediaId } });
    if (!existingMedia) {
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }

    // Verificar se o post existe
    const existingPost = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!existingPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    // Criar a publicação
    return this.publicationRepository.createPublication(createPublicationDto);
  }

  async findAll(): Promise<Publication[]> {
    return this.publicationRepository.findAllPublications();
  }

  async findOne(id: number): Promise<Publication> {
    const publication = await this.publicationRepository.findPublicationById(id);

    if (!publication) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }

    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto): Promise<Publication> {
    const existingPublication = await this.publicationRepository.findPublicationById(id);

    if (!existingPublication) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }

    if (existingPublication.published) {
      throw new HttpException('Published publications cannot be updated', HttpStatus.FORBIDDEN);
    }

    const { mediaId, postId } = updatePublicationDto;
    if (mediaId) {
      // Verificar se a mídia existe
      const existingMedia = await this.prisma.media.findUnique({ where: { id: mediaId } });
      if (!existingMedia) {
        throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
      }
    }

    if (postId) {
      // Verificar se o post existe
      const existingPost = await this.prisma.post.findUnique({ where: { id: postId } });
      if (!existingPost) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
    }

    // Atualizar a publicação
    return this.publicationRepository.updatePublication(existingPublication, updatePublicationDto);
  }

  async remove(id: number): Promise<void> {
    const existingPublication = await this.publicationRepository.findPublicationById(id);

    if (!existingPublication) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }

    // Remover a publicação
    await this.publicationRepository.removePublication(existingPublication);
  }
}
