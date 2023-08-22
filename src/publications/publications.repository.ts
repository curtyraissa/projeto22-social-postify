import { EntityRepository, Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';

@EntityRepository(Publication)
export class PublicationRepository extends Repository<Publication> {}
