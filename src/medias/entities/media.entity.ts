import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Media {
  // Identificador único gerado automaticamente
  @PrimaryGeneratedColumn()
  id: number;

  // Título da mídia (rede social) - deve ser único
  @Column({ unique: true })
  title: string;

  // Nome de usuário ou URL associada à mídia (rede social)
  @Column()
  username: string;
}
