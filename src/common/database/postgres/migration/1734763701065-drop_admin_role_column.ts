import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropAdminRoleColumn1734763701065 implements MigrationInterface {
  name = 'DropAdminRoleColumn1734763701065';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."admin_role_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."admin_role_enum" AS ENUM('owner', 'admin')`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin" ADD "role" "public"."admin_role_enum" NOT NULL`,
    );
  }
}
