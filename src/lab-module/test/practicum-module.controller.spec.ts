import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePracticumModuleDto } from 'src/lab-module/dto';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { LabModule } from 'src/lab-module/entities';
import { LabModuleController } from '../lab-module.controller';
import { LabModuleModule } from '../lab-module.module';

describe('PracticumModuleController', () => {
  let controller: LabModuleController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LabModuleModule],
    }).compile();

    controller = module.get(LabModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it(`harus mengembalikan object bertipe ${SuccessfulResponseDto.name} berisi data array ${LabModule.name}`, async () => {
      const response = await controller.getAll();
      const practicumMaterials = response.data as LabModule[];
      expect(response).toBeInstanceOf(SuccessfulResponseDto);
      expect(
        practicumMaterials.every((material) => material instanceof LabModule),
      ).toBeTruthy();
    });
  });

  describe('getPreTasks()', () => {
    it('harus return array yang semua element nya memiliki property preTask', async () => {
      const practicumMaterials = (await controller.getAll())
        .data as LabModule[];
      expect(
        practicumMaterials.every((practicumModule) =>
          practicumModule.hasOwnProperty('preTask'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getVideos()', () => {
    it('harus return array yang semua element nya memiliki property video', async () => {
      const practicumMaterials = (await controller.getAll())
        .data as LabModule[];
      expect(
        practicumMaterials.every((practicumModule) =>
          practicumModule.hasOwnProperty('video'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getSimulators()', () => {
    it('harus return array yang semua element nya memiliki property simulator', async () => {
      const practicumMaterials = (await controller.getAll())
        .data as LabModule[];
      expect(
        practicumMaterials.every((practicumModule) =>
          practicumModule.hasOwnProperty('simulator'),
        ),
      ).toBeTruthy();
    });
  });

  describe('getJournalCovers()', () => {
    it('harus return array yang semua element nya memiliki property journalCover', async () => {
      const practicumMaterials = (await controller.getAll())
        .data as LabModule[];
      expect(
        practicumMaterials.every((practicumModule) =>
          practicumModule.hasOwnProperty('journalCover'),
        ),
      ).toBeTruthy();
    });
  });

  describe('update()', () => {
    let practicumModule: LabModule;
    beforeAll(async () => {
      practicumModule = (await controller.getAll()).data[0];
    });
    it(`harus berhasil update dan return object bertipe ${SuccessfulResponseDto.name} berisi data ${LabModule.name} yang telah diupdate`, async () => {
      const response = await controller.update(
        practicumModule as UpdatePracticumModuleDto,
      );
      const updatedPracticumModule = response.data as LabModule;
      expect(response).toBeInstanceOf(SuccessfulResponseDto);
      expect(updatedPracticumModule).toBeInstanceOf(LabModule);
    });
  });
});
