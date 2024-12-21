import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorOrganigram1734801991434 implements MigrationInterface {
  name = 'RefactorOrganigram1734801991434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "organigram" DROP COLUMN "url"`);
    await queryRunner.query(`ALTER TABLE "organigram" ADD "link" text`);
    await queryRunner.query(
      `ALTER TABLE "organigram" ADD "is_published" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organigram" DROP COLUMN "is_published"`,
    );
    await queryRunner.query(`ALTER TABLE "organigram" DROP COLUMN "link"`);
    await queryRunner.query(`ALTER TABLE "organigram" ADD "url" text`);
  }
}
