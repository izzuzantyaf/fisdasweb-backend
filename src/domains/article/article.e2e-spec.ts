import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { ArticleModule } from 'src/domains/article/article.module';

describe('Application (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ArticleModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/api/admin (POST)', async () => {
  //   const response = await request(app.getHttpServer()).post('/admin').send({
  //     name: faker.person.fullName(),
  //     email: faker.internet.email(),
  //     password: 'helloworld',
  //     role: 'admin',
  //   });
  //   expect(response.statusCode).toEqual(201);
  // });

  it('/api/articles (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/articles');
    expect(response.statusCode).toBe(200);
  });

  // afterAll(async () => {
  //   await app.close();
  // });
});
