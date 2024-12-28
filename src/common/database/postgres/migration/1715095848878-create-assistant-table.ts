import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssistantTable1715095848878 implements MigrationInterface {
  name = 'CreateAssistantTable1715095848878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."assistant_gender_enum" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."assistant_level_enum" AS ENUM('junior', 'senior')`,
    );
    await queryRunner.query(
      `CREATE TABLE "assistant" ("id" SERIAL NOT NULL, "name" text NOT NULL, "code" text NOT NULL, "phone" text NOT NULL, "line_id" text NOT NULL, "gender" "public"."assistant_gender_enum" NOT NULL, "level" "public"."assistant_level_enum" NOT NULL, "feedback_url" text NOT NULL, "image_url" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_assistant" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "assistant"`);
    await queryRunner.query(`DROP TYPE "public"."assistant_level_enum"`);
    await queryRunner.query(`DROP TYPE "public"."assistant_gender_enum"`);
  }
}
