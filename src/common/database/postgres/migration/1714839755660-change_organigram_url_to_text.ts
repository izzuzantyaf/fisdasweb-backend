import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeOrganigramUrlToText1714839755660
  implements MigrationInterface
{
  name = 'ChangeOrganigramUrlToText1714839755660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organigram" ALTER COLUMN "url" TYPE text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organigram" ALTER COLUMN "url" TYPE character varying(2000)`,
    );
  }
}
