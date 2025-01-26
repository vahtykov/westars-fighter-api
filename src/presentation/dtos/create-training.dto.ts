import { IsString, IsNotEmpty, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateTrainingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  fullText: string;

  @IsUUID()
  @IsNotEmpty()
  previewFileId: string;

  @IsUUID()
  @IsNotEmpty()
  videoFileId: string;

  @IsNumber()
  @IsOptional()
  levelId?: number;
}
