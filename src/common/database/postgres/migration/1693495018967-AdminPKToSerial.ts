import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminPKToSerial1693495018967 implements MigrationInterface {
  name = 'AdminPKToSerial1693495018967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "PK_admin"`);
    await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "admin" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "admin" ADD CONSTRAINT "PK_admin" PRIMARY KEY ("id")`,
    );
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "PK_admin"`);
    await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "admin" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ADD CONSTRAINT "PK_admin" PRIMARY KEY ("id")`,
    );
  }
}
