import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorCodeOfConduct1734793060795 implements MigrationInterface {
  name = 'RefactorCodeOfConduct1734793060795';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "code_of_conduct" DROP COLUMN "url"`);
    await queryRunner.query(`ALTER TABLE "code_of_conduct" ADD "link" text`);
    await queryRunner.query(
      `ALTER TABLE "code_of_conduct" ADD "is_published" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "code_of_conduct" DROP COLUMN "is_published"`,
    );
    await queryRunner.query(`ALTER TABLE "code_of_conduct" DROP COLUMN "link"`);
    await queryRunner.query(`ALTER TABLE "code_of_conduct" ADD "url" text`);
  }
}
