import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeOrganigramUrlToText1714839755660
  implements MigrationInterface
{
  name = 'ChangeOrganigramUrlToText1714839755660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."admin_role_enum" RENAME TO "admin_role_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."admin_role_enum" AS ENUM('owner', 'admin')`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ALTER COLUMN "role" TYPE "public"."admin_role_enum" USING "role"::"text"::"public"."admin_role_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."admin_role_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "organigram" ALTER COLUMN "url" TYPE text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organigram" ALTER COLUMN "url" TYPE character varying(2000)`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."admin_role_enum_old" AS ENUM('owner', 'admin')`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ALTER COLUMN "role" TYPE "public"."admin_role_enum_old" USING "role"::"text"::"public"."admin_role_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."admin_role_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."admin_role_enum_old" RENAME TO "admin_role_enum"`,
    );
  }
}
