import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { PublicationService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  // Rota para criar uma nova publicação
  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    // Verificar se os campos obrigatórios foram fornecidos
    if (!createPublicationDto.mediaId || !createPublicationDto.postId || !createPublicationDto.date) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }

    // Chamar o serviço para criar a publicação
    return this.publicationService.create(createPublicationDto);
  }

  // Rota para buscar todas as publicações
  @Get()
  findAll() {
    // Chamar o serviço para buscar todas as publicações
    const publications = this.publicationService.findAll();
    return publications;
  }

  // Rota para buscar uma publicação pelo ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      // Chamar o serviço para buscar uma publicação pelo ID
      const publication = await this.publicationService.findOne(+id);
      return publication;
    } catch (error) {
      throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
    }
  }

  // Rota para atualizar uma publicação pelo ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    try {
      // Chamar o serviço para atualizar uma publicação pelo ID
      const updatedPublication = await this.publicationService.update(+id, updatePublicationDto);
      return updatedPublication;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  // Rota para remover uma publicação pelo ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const publicationId = +id;
    // Chamar o serviço para remover uma publicação pelo ID
    await this.publicationService.remove(publicationId);
  }
}
