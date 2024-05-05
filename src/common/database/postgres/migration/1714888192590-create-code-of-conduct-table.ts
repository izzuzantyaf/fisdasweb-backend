import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCodeOfConductTable1714888192590
  implements MigrationInterface
{
  name = 'CreateCodeOfConductTable1714888192590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "code_of_conduct" ("id" SERIAL NOT NULL, "url" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_code_of_conduct" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "code_of_conduct"`);
  }
}
