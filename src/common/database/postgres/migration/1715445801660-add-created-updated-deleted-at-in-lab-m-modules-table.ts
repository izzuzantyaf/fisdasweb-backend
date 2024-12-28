import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedUpdatedDeletedAtInLabMModulesTable1715445801660
  implements MigrationInterface
{
  name = 'AddCreatedUpdatedDeletedAtInLabMModulesTable1715445801660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" ADD "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lab_module" DROP COLUMN "created_at"`,
    );
  }
}
