import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ITrainingRepository } from '../../core/repositories/training.repository.interface';
import { Training } from '../../core/domain/entities/training.entity';
import { encodeCursor, decodeCursor } from '../../utils/cursor.util';
import { FileRepository } from '../../core/repositories/file.repository';
import { User } from '../../core/domain/entities/user.entity';
import { CreateTrainingDto } from '../../presentation/dtos/create-training.dto';
import { UpdateTrainingDto } from '../../presentation/dtos/update-training.dto';
import { S3Service } from '../../infrastructure/external-services/s3.service';
import { ITrainingLevelRepository } from '../../core/repositories/training-level.interface.repository';
import { TrainingLevel } from '../../core/domain/entities/training-level.entity';

@Injectable()
export class TrainingService {
  constructor(
    @Inject('ITrainingRepository')
    private trainingRepository: ITrainingRepository,
    @Inject('ITrainingLevelRepository')
    private trainingLevelRepository: ITrainingLevelRepository,
    private fileRepository: FileRepository,
    private s3Service: S3Service
  ) {}

  /**
   * TODO: prevCursor works not correctly.
   */
  async getAllTrainings(
    cursor?: string, 
    limit?: number, 
    isBackward: boolean = false, 
    levelId?: number
  ): Promise<{trainings: Training[], nextCursor: string | null, prevCursor: string | null}> {
    const validLimit = limit || 10; // Default to 10 if limit is not provided
    const trainings = await this.trainingRepository.findAll(cursor, validLimit + 1, isBackward, levelId);
    
    let hasMore = trainings.length > validLimit;
    if (hasMore) {
      trainings.pop(); // Remove the extra item
    }

    let nextCursor = null;
    let prevCursor = null;

    if (trainings.length > 0) {
      if (hasMore) {
        const cursorItem = isBackward ? trainings[0] : trainings[trainings.length - 1];
        nextCursor = encodeCursor({
          createdAt: cursorItem.createdAt,
          id: cursorItem.id
        });
      }

      if (cursor) {
        const decodedCursor = decodeCursor(cursor);
        const isEdgeBatch = isBackward
          ? await this.trainingRepository.isLastBatch(decodedCursor.createdAt, decodedCursor.id)
          : await this.trainingRepository.isFirstBatch(decodedCursor.createdAt, decodedCursor.id);

        if (!isEdgeBatch) {
          const cursorItem = isBackward ? trainings[trainings.length - 1] : trainings[0];
          prevCursor = encodeCursor({
            createdAt: cursorItem.createdAt,
            id: cursorItem.id
          });
        }
      }
    }

    return {
      trainings,
      nextCursor,
      prevCursor: null // todo: fix
    };
  }

  async getTrainingById(id: number): Promise<Training> {
    const training = await this.trainingRepository.findById(id);
    if (!training) {
      throw new NotFoundException('Training not found');
    }
    return training;
  }

  async createTraining(createTrainingDto: CreateTrainingDto, previewFileId: string, videoFileId: string, user: User): Promise<Training> {
    const previewFile = await this.fileRepository.findById(previewFileId);
    const videoFile = await this.fileRepository.findById(videoFileId);

    if (!previewFile || !videoFile) {
      throw new NotFoundException('Preview or video file not found');
    }

    const trainingData: Partial<Training> = {
      ...createTrainingDto,
      previewUrl: previewFile.url,
      videoUrl: videoFile.url,
      previewFileId: previewFileId,
      videoFileId: videoFileId,
      user: user,
      levelId: createTrainingDto.levelId || null
    };

    return this.trainingRepository.create(trainingData);
  }

  async updateTraining(id: number, updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    const training = await this.trainingRepository.findById(id);
    if (!training) {
      throw new NotFoundException('Training not found');
    }

    const updatedTrainingData: Partial<Training> = { ...updateTrainingDto };

    if (updateTrainingDto.previewFileId && updateTrainingDto.previewFileId !== training.previewFileId) {
      const newPreviewFile = await this.fileRepository.findById(updateTrainingDto.previewFileId);
      if (!newPreviewFile) {
        throw new BadRequestException('New preview file not found');
      }

      // Update training record first
      updatedTrainingData.previewFileId = newPreviewFile.id;
      updatedTrainingData.previewUrl = newPreviewFile.url;
      await this.trainingRepository.update(id, updatedTrainingData);

      // Then remove old preview file from S3 and database
      if (training.previewFileId) {
        const oldPreviewFile = await this.fileRepository.findById(training.previewFileId);
        if (oldPreviewFile) {
          await this.s3Service.deleteFile(oldPreviewFile.bucketName, oldPreviewFile.key);
          await this.fileRepository.delete(oldPreviewFile.id);
        }
      }
    }

    if (updateTrainingDto.videoFileId && updateTrainingDto.videoFileId !== training.videoFileId) {
      const newVideoFile = await this.fileRepository.findById(updateTrainingDto.videoFileId);
      if (!newVideoFile) {
        throw new BadRequestException('New video file not found');
      }

      // Update training record first
      updatedTrainingData.videoFileId = newVideoFile.id;
      updatedTrainingData.videoUrl = newVideoFile.url;
      await this.trainingRepository.update(id, updatedTrainingData);

      // Then remove old video file from S3 and database
      if (training.videoFileId) {
        const oldVideoFile = await this.fileRepository.findById(training.videoFileId);
        if (oldVideoFile) {
          await this.s3Service.deleteFile(oldVideoFile.bucketName, oldVideoFile.key);
          await this.fileRepository.delete(oldVideoFile.id);
        }
      }
    }

    // Update any remaining fields
    if (Object.keys(updatedTrainingData).length > 0) {
      await this.trainingRepository.update(id, updatedTrainingData);
    }

    return this.trainingRepository.findById(id);
  }

  async deleteTraining(id: number): Promise<void> {
    const training = await this.trainingRepository.findById(id);
    if (!training) {
      throw new NotFoundException('Training not found');
    }
    await this.trainingRepository.delete(id);
  }

  async getAllTrainingLevels(): Promise<TrainingLevel[]> {
    return this.trainingLevelRepository.findAll();
  }
}
