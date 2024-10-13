import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateTrainingDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  fullText?: string;

  @IsUUID()
  @IsOptional()
  previewFileId?: string;

  @IsUUID()
  @IsOptional()
  videoFileId?: string;
}