import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseMigrations1657476855327 implements MigrationInterface {
    name = 'BaseMigrations1657476855327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "testUser" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "testname" character varying NOT NULL, "testpassword" character varying NOT NULL, "testavatar" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_ef7711b6553b136bfa5ef1c5521" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "testUser"`);
    }

}
