import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Put, HttpCode } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  // Endpoint para criar uma nova mídia (rede social)
  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    // Verifica se os campos obrigatórios estão presentes
    if (!createMediaDto.title || !createMediaDto.username) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }
    
    // Chama o serviço para criar a mídia e retorna o resultado
    return this.mediasService.create(createMediaDto);
  }

  // Endpoint para buscar todas as mídias
  @Get()
  findAll() {
    //Chama o servico para buscar todas as midias
    const medias = this.mediasService.findAll();
    
    return medias;
  }

  // Endpoint para buscar uma mídia por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const media = await this.mediasService.findOne(+id);
      return media;
    } catch (error) {
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }
  }

  // Endpoint para atualizar uma mídia por ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    try {
      // Chama o serviço para atualizar a mídia com o ID fornecido
      const updatedMedia = this.mediasService.update(+id, updateMediaDto);
      return updatedMedia;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  // Endpoint para remover uma mídia por ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
  const mediaId = +id; // Converte o parâmetro de string para número
  this.mediasService.remove(mediaId);
}
}
