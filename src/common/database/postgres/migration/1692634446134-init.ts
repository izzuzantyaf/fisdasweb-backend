import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1692634446134 implements MigrationInterface {
    name = 'Init1692634446134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."admin_role_enum" AS ENUM('owner', 'admin')`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(100) NOT NULL, "role" "public"."admin_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_admin_email" UNIQUE ("email"), CONSTRAINT "PK_admin" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TYPE "public"."admin_role_enum"`);
    }

}
