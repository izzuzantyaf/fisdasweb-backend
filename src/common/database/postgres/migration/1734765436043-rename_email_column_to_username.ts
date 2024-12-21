import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameEmailColumnToUsername1734765436043
  implements MigrationInterface
{
  name = 'RenameEmailColumnToUsername1734765436043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin" RENAME COLUMN "email" TO "username"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin" RENAME COLUMN "username" TO "email"`,
    );
  }
}
