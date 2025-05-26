import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndInternship1748198226327 implements MigrationInterface {
    name = 'CreateUserAndInternship1748198226327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`internship\` (\`id\` int NOT NULL AUTO_INCREMENT, \`joined_date\` datetime NOT NULL, \`completion_date\` datetime NOT NULL, \`is_certified\` tinyint NOT NULL, \`mentor_name\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fname\` varchar(255) NOT NULL, \`lname\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`internship\` ADD CONSTRAINT \`FK_efc7c9c49d46553d73e79f7c4e7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`internship\` DROP FOREIGN KEY \`FK_efc7c9c49d46553d73e79f7c4e7\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`internship\``);
    }

}
