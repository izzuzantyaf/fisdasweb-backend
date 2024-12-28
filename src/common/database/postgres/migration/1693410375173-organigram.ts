import { MigrationInterface, QueryRunner } from 'typeorm';

export class Organigram1693410375173 implements MigrationInterface {
  name = 'Organigram1693410375173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organigram" ("id" SERIAL NOT NULL, "url" character varying(2000), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_b4f616ecd14c06fa8783cff04bc" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "organigram"`);
  }
}
