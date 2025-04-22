import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAssistantEnum1736257894960 implements MigrationInterface {
  name = 'AddAssistantEnum1736257894960';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."assistant_level_enum" AS ENUM('junior', 'senior')`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ADD "level" "public"."assistant_level_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assistant" DROP COLUMN "level"`);
    await queryRunner.query(`DROP TYPE "public"."assistant_level_enum"`);
  }
}
