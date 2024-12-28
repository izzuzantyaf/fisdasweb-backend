import { MigrationInterface, QueryRunner } from 'typeorm';

export class RevampLabModuleTable1735393962061 implements MigrationInterface {
  name = 'RevampLabModuleTable1735393962061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lab_module" DROP COLUMN "language"`);
    await queryRunner.query(`DROP TYPE "public"."lab_module_language_enum"`);
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "pretask_url"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "is_pretask_visible"`,
    );
    await queryRunner.query(`ALTER TABLE "lab_module" DROP COLUMN "video_url"`);
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "is_video_visible"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "simulator_url"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "is_simulator_visible"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "journal_cover_url"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "is_journal_cover_visible"`,
    );
    await queryRunner.query(`ALTER TABLE "lab_module" ADD "pretask_link" text`);
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "pretask_is_published" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "lab_module" ADD "video_link" text`);
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "video_is_published" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "simulator_link" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "simulator_is_published" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "journal_cover_link" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "journal_cover_is_published" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "journal_cover_is_published"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "journal_cover_link"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "simulator_is_published"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "simulator_link"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "video_is_published"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "video_link"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "pretask_is_published"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "pretask_link"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "is_journal_cover_visible" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "journal_cover_url" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "is_simulator_visible" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "simulator_url" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "is_video_visible" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(`ALTER TABLE "lab_module" ADD "video_url" text`);
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "is_pretask_visible" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(`ALTER TABLE "lab_module" ADD "pretask_url" text`);
    await queryRunner.query(
      `CREATE TYPE "public"."lab_module_language_enum" AS ENUM('id', 'en')`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "language" "public"."lab_module_language_enum" NOT NULL`,
    );
  }
}
