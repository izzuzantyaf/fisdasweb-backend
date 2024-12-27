import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateScheduleTable1735329225967 implements MigrationInterface {
  name = 'CreateScheduleTable1735329225967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "name" text NOT NULL, "link" text, "is_published" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_schedule" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "schedule"`);
  }
}
