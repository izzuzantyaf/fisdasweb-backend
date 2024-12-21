import { Injectable, Logger } from '@nestjs/common';
import { UpdateCodeOfConductDto } from 'src/code-of-conduct/dto';
import { CodeOfConduct } from 'src/code-of-conduct/entities';
import { CodeOfConductRepository } from 'src/code-of-conduct/repo';

@Injectable()
export class CodeOfConductService {
  private readonly logger = new Logger(CodeOfConductService.name);

  constructor(private codeOfConductRepository: CodeOfConductRepository) {}

  async get() {
    const codeofconducts = await this.codeOfConductRepository.find();

    return codeofconducts[0] || null;
  }

  async getPublished() {
    const codeofconducts = await this.codeOfConductRepository.find({
      where: { is_published: true },
    });

    return codeofconducts[0] || null;
  }

  async update(id: CodeOfConduct['id'], data: UpdateCodeOfConductDto) {
    const updatedCodeOfConduct = await this.codeOfConductRepository.update(
      id,
      data,
      {
        returning: ['id', 'link', 'is_published'],
      },
    );

    return updatedCodeOfConduct;
  }
}
