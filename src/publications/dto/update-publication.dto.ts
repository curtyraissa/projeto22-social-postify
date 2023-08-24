import { IsOptional, IsBoolean, IsDateString, IsNumber } from 'class-validator';
export class UpdatePublicationDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsNumber()
  mediaId?: number;

  @IsOptional()
  @IsNumber()
  postId?: number;
}
