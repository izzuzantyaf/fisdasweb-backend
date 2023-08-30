import { MigrationInterface, QueryRunner } from 'typeorm';

export class Organigram1693410375173 implements MigrationInterface {
  name = 'Organigram1693410375173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organigram" ("id" SERIAL NOT NULL, "url" character varying(2000), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_b4f616ecd14c06fa8783cff04bc" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(`DROP TABLE "organigram"`);
  }
}
