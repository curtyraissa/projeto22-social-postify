import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication as PrismaPublication } from '@prisma/client';

@Injectable()
export class PublicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar uma nova publicação
  async createPublication(createPublicationDto: CreatePublicationDto): Promise<PrismaPublication> {
    const { mediaId, postId, date } = createPublicationDto;

    return this.prisma.publication.create({
      data: {
        media: { connect: { id: mediaId } }, // Conectar à mídia associada
        post: { connect: { id: postId } },   // Conectar ao post associado
        date,
        published: false, // Definir como não publicado por padrão
      },
    });
  }

  // Método para encontrar uma publicação pelo ID
  async findPublicationById(id: number): Promise<PrismaPublication | null> {
    return this.prisma.publication.findUnique({
      where: { id },
    });
  }

  // Método para atualizar uma publicação
  async updatePublication(publication: PrismaPublication, updatePublicationDto: UpdatePublicationDto): Promise<PrismaPublication> {
    const { date, published } = updatePublicationDto;

    return this.prisma.publication.update({
      where: { id: publication.id },
      data: {
        date: date || publication.date, // Usar nova data ou manter a original
        published: published !== undefined ? published : publication.published, // Atualizar publicação somente se fornecido
      },
    });
  }

  // Método para remover uma publicação
  async removePublication(publication: PrismaPublication): Promise<PrismaPublication> {
    return this.prisma.publication.delete({
      where: { id: publication.id },
    });
  }

  // Método para buscar todas as publicações
  async findAllPublications(): Promise<PrismaPublication[]> {
    return this.prisma.publication.findMany();
  }
}
