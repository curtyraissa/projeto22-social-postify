import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaRepository } from './medias.repository';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediasService {
  constructor(
    @InjectRepository(MediaRepository)
    private mediaRepository: MediaRepository,
  ) {}

  // Método para criar uma nova mídia (rede social)
  async create(createMediaDto: CreateMediaDto) {
    const { title, username } = createMediaDto;

    // Verifica se a mídia já existe com a combinação de título e nome de usuário
    const existingMedia = await this.mediaRepository.findOne({
      where: { title, username },
    });

    // Se a mídia já existe, lança um erro de conflito
    if (existingMedia) {
      throw new HttpException('Media already exists', HttpStatus.CONFLICT);
    }

    // Chama o método do repositório para criar a mídia
    return this.mediaRepository.createMedia(createMediaDto);
  }

  // Método para buscar todas as mídias
  findAll() {
    return `This action returns all medias`;
  }

  // Método para buscar uma mídia por ID
  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  // Método para atualizar uma mídia por ID
  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  // Método para remover uma mídia por ID
  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
