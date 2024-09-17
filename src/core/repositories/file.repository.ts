import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../../core/domain/entities/file.entity';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async create(fileData: Partial<File>): Promise<File> {
    const file = this.fileRepository.create(fileData);
    return this.fileRepository.save(file);
  }

  async findById(id: string): Promise<File | null> {
    return this.fileRepository.findOne({ where: { id } });
  }

  // Add more methods as needed
}