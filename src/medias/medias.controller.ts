import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.mediasService.findOne(+id);
  }

  // Endpoint para atualizar uma mídia por ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.update(+id, updateMediaDto);
  }

  // Endpoint para remover uma mídia por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediasService.remove(+id);
  }
}
