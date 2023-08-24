import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MediaRepository } from './medias.repository';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediasService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async create(createMediaDto: CreateMediaDto): Promise<any> {
    const { title, username } = createMediaDto;

    // Verificar se já existe uma mídia com o mesmo título e nome de usuário
    const existingMedia = await this.mediaRepository.findByTitleAndUsername(title, username);

    if (existingMedia) {
      throw new HttpException('Media already exists', HttpStatus.CONFLICT);
    }

    // Criar a nova mídia utilizando o repositório
    return this.mediaRepository.createMedia(createMediaDto);
  }

  async findAll(): Promise<any[]> {
    // Buscar todas as mídias utilizando o repositório
    const medias = await this.mediaRepository.findAllMedia();

    // Mapear os resultados para o formato desejado
    return medias.map(media => ({
      id: media.id,
      title: media.title,
      username: media.username,
    }));
  }

  async findOne(id: number): Promise<any> {
    // Buscar uma mídia pelo ID utilizando o repositório
    const media = await this.mediaRepository.findMediaById(id);

    if (!media) {
      // Se a mídia não for encontrada, lançar um erro
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }

    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<any> {
    // Verificar se a mídia com o ID fornecido existe
    const existingMedia = await this.mediaRepository.findMediaById(id);

    if (!existingMedia) {
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }

    // Atualizar a mídia utilizando o repositório
    return this.mediaRepository.updateMedia(id, updateMediaDto);
  }

  async remove(id: number): Promise<void> {
    // Verificar se a mídia com o ID fornecido existe
    const existingMedia = await this.mediaRepository.findMediaById(id);

    if (!existingMedia) {
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }

    // Remover a mídia utilizando o repositório
    await this.mediaRepository.removeMedia(id);
  }
}
