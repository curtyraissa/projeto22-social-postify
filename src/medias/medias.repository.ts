import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Cria uma nova mídia com base nos dados fornecidos
  async createMedia(createMediaDto: CreateMediaDto) {
    const { title, username } = createMediaDto;

    return this.prisma.media.create({
      data: {
        title,
        username,
      },
    });
  }

  // Busca uma mídia pelo título e nome de usuário
  async findByTitleAndUsername(title: string, username: string) {
    return this.prisma.media.findFirst({
      where: {
        title,
        username,
      },
    });
  }

  // Retorna todas as mídias registradas no sistema
  async findAllMedia() {
    return this.prisma.media.findMany();
  }

  // Busca uma mídia pelo ID
  async findMediaById(id: number) {
    return this.prisma.media.findUnique({
      where: { id },
    });
  }

  // Atualiza os dados de uma mídia com base no objeto de atualização fornecido
  async updateMedia(id: number, updateMediaDto: UpdateMediaDto) {
    return this.prisma.media.update({
      where: { id },
      data: updateMediaDto,
    });
  }

  // Remove uma mídia do sistema
  async removeMedia(id: number) {
    return this.prisma.media.delete({
      where: { id },
    });
  }

}
