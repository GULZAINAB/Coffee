import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1730749152933 implements MigrationInterface {
    name = 'SchemaSync1730749152933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "price"`);
    }

}
