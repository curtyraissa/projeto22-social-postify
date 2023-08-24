import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';
export class CreatePublicationDto {
  @IsNotEmpty()
  @IsInt()
  mediaId: number;

  @IsNotEmpty()
  @IsInt()
  postId: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
