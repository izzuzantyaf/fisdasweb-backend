import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNameEmailPasswordTypeToText1714818342490
  implements MigrationInterface
{
  name = 'ChangeNameEmailPasswordTypeToText1714818342490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin" ALTER COLUMN "name" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ALTER COLUMN "email" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ALTER COLUMN "password" TYPE text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin" ALTER COLUMN "password" TYPE character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ALTER COLUMN "email" TYPE character varying(200)`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ALTER COLUMN "name" TYPE character varying(200)`,
    );
  }
}
