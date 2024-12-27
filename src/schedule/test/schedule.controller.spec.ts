import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateScheduleDto } from 'src/schedule/dto';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { Schedule } from 'src/schedule/entities';
import { ScheduleController } from '../schedule.controller';
import { ScheduleModule } from '../schedule.module';

describe('ScheduleController', () => {
  let controller: ScheduleController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScheduleModule],
    }).compile();

    controller = module.get(ScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it(`harus return array object bertipe ${SuccessfulResponseDto.name} berisi data array ${Schedule.name}`, async () => {
      const response = await controller.getAll();
      const schedules = response.data as Schedule[];
      expect(response).toBeInstanceOf(SuccessfulResponseDto);
      expect(
        schedules.every((schedule) => schedule instanceof Schedule),
      ).toBeTruthy();
    });

    it(`harus return data array ${Schedule.name} yang property isActive = true`, async () => {
      const activeSchedules = (await controller.getAll({ isActive: true }))
        .data as Schedule[];
      expect(
        activeSchedules.every((schedule) => schedule.isActive == true),
      ).toBeTruthy();
    });
  });

  describe('update()', () => {
    let schedule: Schedule;
    beforeAll(async () => {
      schedule = (await controller.getAll()).data[0];
    });
    it(`harus berhasil update dan return object bertipe ${SuccessfulResponseDto.name} berisi data ${Schedule.name} yang telah diupdate`, async () => {
      const response = await controller.update({
        ...schedule,
        url: faker.internet.url(),
        isActive: !schedule.isActive,
      } as UpdateScheduleDto);
      const updatedSchedule = response.data as Schedule;
      expect(response).toBeInstanceOf(SuccessfulResponseDto);
      expect(updatedSchedule).toBeInstanceOf(Schedule);
    });
    it('harus gagal update karena URL tidak valid', async () => {
      await expect(
        controller.update({
          ...schedule,
          url: 'Link tidak valid',
        } as UpdateScheduleDto),
      ).rejects.toThrow();
    });
  });
});
