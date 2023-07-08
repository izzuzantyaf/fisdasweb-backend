import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { isJWT } from 'class-validator';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { AdminController } from 'src/admin/admin.controller';
import { AdminModule } from 'src/admin/admin.module';
import { AuthController } from '../auth.controller';
import { AuthModule } from '../auth.module';
import { AdminRole } from 'src/admin/constants';

describe('AuthController', () => {
  let controller: AuthController;
  let adminController: AdminController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminModule, AuthModule],
    }).compile();

    controller = module.get(AuthController);
    adminController = module.get(AdminController);
  });

  it('should be defined', () => {
    expect(adminController).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('signin()', () => {
    const fakeAdmin = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'helloworld',
      role: AdminRole.ADMIN,
    };
    beforeAll(async () => {
      await adminController.create(fakeAdmin);
    });
    it(`harus berhasil login, return object bertipe ${SuccessfulResponseDto.name} berisi access_token`, async () => {
      const response = await controller.signin({
        user: { username: fakeAdmin.email, password: fakeAdmin.password },
      });
      expect(response).toBeInstanceOf(SuccessfulResponseDto);
      const access_token = response.data.access_token;
      expect(isJWT(access_token)).toBeTruthy();
    });
    // it('harus gagal login karena username salah', async () => {
    //   await expect(
    //     controller.signin({
    //       user: { username: 'email salah', password: fakeAdmin.password },
    //     }),
    //   ).rejects.toThrow();
    // });
    // it('harus gagal login karena password salah', async () => {
    //   await expect(
    //     controller.signin({
    //       user: { username: fakeAdmin.email, password: 'password salah' },
    //     }),
    //   ).rejects.toThrow();
    // });
  });
});
