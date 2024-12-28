import { MigrationInterface, QueryRunner } from 'typeorm';

export class RevampAssistantTable1735376944048 implements MigrationInterface {
  name = 'RevampAssistantTable1735376944048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assistant" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "assistant" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "public"."assistant_gender_enum"`);
    await queryRunner.query(`ALTER TABLE "assistant" DROP COLUMN "level"`);
    await queryRunner.query(`DROP TYPE "public"."assistant_level_enum"`);
    await queryRunner.query(
      `ALTER TABLE "assistant" DROP COLUMN "feedback_url"`,
    );
    await queryRunner.query(`ALTER TABLE "assistant" DROP COLUMN "image_url"`);
    await queryRunner.query(
      `ALTER TABLE "assistant" ADD "is_published" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "code" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "code" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" DROP COLUMN "is_published"`,
    );
    await queryRunner.query(`ALTER TABLE "assistant" ADD "image_url" text`);
    await queryRunner.query(`ALTER TABLE "assistant" ADD "feedback_url" text`);
    await queryRunner.query(
      `CREATE TYPE "public"."assistant_level_enum" AS ENUM('junior', 'senior')`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ADD "level" "public"."assistant_level_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."assistant_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ADD "gender" "public"."assistant_gender_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "assistant" ADD "phone" text`);
  }
}
