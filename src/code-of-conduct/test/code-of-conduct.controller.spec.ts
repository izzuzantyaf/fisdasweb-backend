import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { CodeOfConductController } from '../code-of-conduct.controller';
import { CodeOfConductModule } from '../code-of-conduct.module';
import { CodeOfConduct } from 'src/code-of-conduct/entity';

describe('OrganigramController', () => {
  let controller: CodeOfConductController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CodeOfConductModule],
    }).compile();

    controller = module.get(CodeOfConductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOne()', () => {
    it(`harus return object bertipe ${SuccessfulResponseDto.name} berisi data ${CodeOfConduct.name}`, async () => {
      const response = await controller.get();
      const organigram = response.data;
      expect(response).toBeInstanceOf(SuccessfulResponseDto);
      expect(organigram).toBeInstanceOf(CodeOfConduct);
    });
  });

  describe('update()', () => {
    let organigram: CodeOfConduct;
    beforeAll(async () => {
      organigram = (await controller.get()).data;
    });
    it(`harus berhasil update dan return object bertipe ${SuccessfulResponseDto.name} berisi organigram yang telah diupdate`, async () => {
      const response = await controller.update({
        _id: organigram._id,
        url: faker.internet.url(),
      });
      const updatedOrganigram = response.data;
      expect(response).toBeInstanceOf(SuccessfulResponseDto);
      expect(updatedOrganigram).toBeInstanceOf(CodeOfConduct);
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
