import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  // Endpoint para criar uma nova publicação
  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    // Verifica se os campos obrigatórios estão presentes no DTO
    if (!createPublicationDto.mediaId || !createPublicationDto.postId || !createPublicationDto.date) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }

    // Chama o serviço para criar a nova publicação e retorna o resultado
    const result = await this.publicationsService.create(createPublicationDto);
    return result;
  }

  @Get()
  findAll() {
    return this.publicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.update(+id, updatePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationsService.remove(+id);
  }
}
