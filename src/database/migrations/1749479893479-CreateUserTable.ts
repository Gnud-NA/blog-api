import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1749479893479 implements MigrationInterface {
  name = 'CreateUserTable1749479893479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "user_name" character varying(25), "avatar" text, "role" "public"."user_role_enum" NOT NULL DEFAULT 'reader', "is_active" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
