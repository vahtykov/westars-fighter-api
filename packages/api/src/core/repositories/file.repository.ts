import { Inject, Injectable } from '@nestjs/common'; 
import { DataSource, Repository } from 'typeorm';
import { File } from '../../core/domain/entities/file.entity';

@Injectable()
export class FileRepository {
  private fileRepository: Repository<File>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.fileRepository = this.dataSource.getRepository(File);
  }

  async create(fileData: Partial<File>): Promise<File> {
    const file = this.fileRepository.create(fileData);
    return this.fileRepository.save(file);
  }

  async findById(id: string): Promise<File | null> {
    return this.fileRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.fileRepository.delete(id);
  }

  // Add more methods as needed
}
