import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLabModuleTable1715442876842 implements MigrationInterface {
  name = 'CreateLabModuleTable1715442876842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."lab_module_language_enum" AS ENUM('id', 'en')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lab_module" ("id" SERIAL NOT NULL, "name" text NOT NULL, "code" text NOT NULL, "language" "public"."lab_module_language_enum" NOT NULL, "pretask_url" text, "is_pretask_visible" boolean NOT NULL DEFAULT true, "video_url" text, "is_video_visible" boolean NOT NULL DEFAULT true, "simulator_url" text, "is_simulator_visible" boolean NOT NULL DEFAULT true, "journal_cover_url" text, "is_journal_cover_visible" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_lab_module" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "lab_module"`);
    await queryRunner.query(`DROP TYPE "public"."lab_module_language_enum"`);
  }
}
