import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

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

  levelId?: number;
}
