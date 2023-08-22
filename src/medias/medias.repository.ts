import { EntityRepository, Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';

@EntityRepository(Media)
export class MediaRepository extends Repository<Media> {
  // Método para criar uma nova mídia (rede social)
  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const { title, username } = createMediaDto;

    // Cria uma nova instância da entidade Media com os dados do DTO
    const media = this.create({ title, username });

    // Salva a nova mídia no banco de dados
    await this.save(media);

    // Retorna a mídia recém-criada
    return media;
  }
}

