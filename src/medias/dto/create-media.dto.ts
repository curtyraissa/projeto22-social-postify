import { IsNotEmpty, IsString } from "class-validator";

export class CreateMediaDto {
    // Título da mídia (rede social)
    @IsNotEmpty()
    @IsString()
    title: string;
  
    // Nome de usuário ou URL associada à mídia (rede social)
    @IsNotEmpty()
    @IsString()
    username: string;
  }
  