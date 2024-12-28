import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeSomeColumnInAssistantNullable1715096146337
  implements MigrationInterface
{
  name = 'MakeSomeColumnInAssistantNullable1715096146337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "code" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "phone" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "line_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "feedback_url" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "image_url" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "image_url" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "feedback_url" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "line_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "phone" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "assistant" ALTER COLUMN "code" SET NOT NULL`,
    );
  }
}
