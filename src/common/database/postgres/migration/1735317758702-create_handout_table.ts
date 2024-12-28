import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHandoutTable1735317758702 implements MigrationInterface {
  name = 'CreateHandoutTable1735317758702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "handout" ("id" SERIAL NOT NULL, "name" text NOT NULL, "link" text, "is_published" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_handout" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "handout"`);
  }
}
