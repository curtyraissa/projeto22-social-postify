import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaRepository } from './medias.repository';
//importar publicationRepository
import { CreateMediaDto } from './dto/create-media.dto';
import { Media } from './entities/media.entity';

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

  // Método para buscar todas as mídias registradas
  async findAll(): Promise<Media[]> {
    // Chama o método do repositório para buscar todas as mídias
    const medias = await this.mediaRepository.find();

    // Retorna o array de mídias formatado no formato especificado
    return medias.map(media => ({
      id: media.id,
      title: media.title,
      username: media.username,
    }));
  }

  // Método para buscar uma mídia por ID
  findOne(id: number): Promise<Media> {
    const media = this.mediaRepository.findOne(id);

    if (!media) {
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }

    return media;
  }

  // Método para atualizar uma mídia por ID
  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const { title, username } = updateMediaDto;

    // Busca a mídia existente com o ID fornecido
    const existingMedia = await this.mediaRepository.findOne({
      where: { id },
    });

    if (!existingMedia) {
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }

    // Verifica se há atualização no título e se não viola regra de unicidade
    if (title && title !== existingMedia.title) {
      const mediaWithTitle = await this.mediaRepository.findOne({
        where: { title },
      });
      if (mediaWithTitle) {
        throw new HttpException('Media title already exists', HttpStatus.CONFLICT);
      }
    }

    // Verifica se há atualização no nome de usuário e se não viola regra de unicidade
    if (username && username !== existingMedia.username) {
      const mediaWithUsername = await this.mediaRepository.findOne({
        where: { username },
      });
      if (mediaWithUsername) {
        throw new HttpException('Media username already exists', HttpStatus.CONFLICT);
      }
    }

    // Atualiza a mídia com as informações fornecidas
    existingMedia.title = title || existingMedia.title;
    existingMedia.username = username || existingMedia.username;
    await this.mediaRepository.save(existingMedia);
    // Retorna a mídia atualizada
    return existingMedia;
  }


  // Método para remover uma mídia por ID
  async remove(id: number): Promise<void> {
    // Busca a mídia existente com o ID fornecido
    const existingMedia = await this.mediaRepository.findOne({
      where: { id },
    });
  
    if (!existingMedia) {
      throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
    }
  
    // Verifica se a mídia está associada a alguma publicação
    const associatedPublications = await this.publicationRepository.find({
      where: { media: existingMedia },
    });
  
    if (associatedPublications.length > 0) {
      throw new HttpException('Cannot delete media associated with publications', HttpStatus.FORBIDDEN);
    }
  
    // Remove a mídia do banco de dados
    await this.mediaRepository.remove(existingMedia);
  }
