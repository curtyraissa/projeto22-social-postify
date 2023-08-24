import { Injectable } from '@nestjs/common';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Cria uma nova mídia com base nos dados fornecidos
  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const { title, username } = createMediaDto;

    return this.prisma.media.create({
      data: {
        title,
        username,
      },
    });
  }

  // Busca uma mídia pelo título e nome de usuário
  async findByTitleAndUsername(title: string, username: string): Promise<Media | null> {
    return this.prisma.media.findFirst({
      where: {
        title,
        username,
      },
    });
  }

  // Retorna todas as mídias registradas no sistema
  async findAllMedia(): Promise<Media[]> {
    return this.prisma.media.findMany();
  }

  // Busca uma mídia pelo ID
  async findMediaById(id: number): Promise<Media | null> {
    return this.prisma.media.findUnique({
      where: { id },
    });
  }

  // Atualiza os dados de uma mídia com base no objeto de atualização fornecido
  async updateMedia(media: Media, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const { title, username } = updateMediaDto;

    return this.prisma.media.update({
      where: { id: media.id },
      data: {
        title: title || media.title,
        username: username || media.username,
      },
    });
  }

  // Remove uma mídia do sistema
  async removeMedia(media: Media): Promise<void> {
    await this.prisma.media.delete({
      where: { id: media.id },
    });
  }

  // Salva os dados de uma mídia
  async save(media: Media): Promise<Media> {
    return this.prisma.media.update({
      where: { id: media.id },
      data: {
        title: media.title,
        username: media.username,
      },
    });
  }
}
