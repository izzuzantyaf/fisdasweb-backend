import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import { MongoService } from 'src/common/database/mongodb/mongo.service';
import { AdminFactoryService } from './admin-factory.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private dataService: MongoService,
    private adminFactoryService: AdminFactoryService,
  ) {}

  async getAll() {
    const admins = this.adminFactoryService.createMany(
      await this.dataService.admins.getAll(),
    );
    return admins;
  }

  async delete(id: string) {
    const deletedAdmin = await this.dataService.admins.deleteById(id);
    this.logger.debug(
      `Deleted admin ${JSON.stringify(deletedAdmin, undefined, 2)}`,
    );
    if (isEmpty(deletedAdmin)) {
      this.logger.log(`Remove admin failed ${JSON.stringify({ adminId: id })}`);
      throw new BadRequestException(new ErrorResponseDto('Akun gagal dihapus'));
    }
    this.logger.log(
      `Remove admin success ${JSON.stringify({ adminId: deletedAdmin._id })}`,
    );
    return this.adminFactoryService.create(deletedAdmin);
  }
}
