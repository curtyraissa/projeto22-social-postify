import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Media } from '../../medias/entities/media.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Media, { eager: true })
  @JoinColumn()
  media: Media;

  @ManyToOne(() => Post, { eager: true })
  @JoinColumn()
  post: Post;

  @Column({ type: 'timestamp' })
  date: Date;
}

