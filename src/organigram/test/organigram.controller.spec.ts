import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { Organigram } from 'src/organigram/entities';
import { OrganigramController } from '../organigram.controller';
import { OrganigramModule } from '../organigram.module';

describe('OrganigramController', () => {
  let controller: OrganigramController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrganigramModule],
    }).compile();

    controller = module.get(OrganigramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOne()', () => {
    it(`harus return object bertipe ${SuccessfulResponseDto.name} berisi data ${Organigram.name}`, async () => {
      const response = await controller.getAll();
      const organigram = response.data;
      expect(response).toBeInstanceOf(SuccessfulResponseDto);
      expect(organigram).toBeInstanceOf(Organigram);
    });
  });

  describe('update()', () => {
    let organigram: Organigram;
    beforeAll(async () => {
      organigram = (await controller.getAll()).data;
    });
    it(`harus berhasil update dan return object bertipe ${SuccessfulResponseDto.name} berisi organigram yang telah diupdate`, async () => {
      const response = await controller.update({
        _id: organigram._id,
        url: faker.internet.url(),
      });
      const updatedOrganigram = response.data;
      expect(response).toBeInstanceOf(SuccessfulResponseDto);
      expect(updatedOrganigram).toBeInstanceOf(Organigram);
    });
    it('harus gagal update karena URL tidak valid', async () => {
      await expect(
        controller.update({
          _id: organigram._id,
          url: 'Link tidak valid',
        }),
      ).rejects.toThrow();
    });
  });
});
