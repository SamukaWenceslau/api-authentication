import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePasswordToken1615402757834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({

            name: "passwordtoken",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "token",
                    type: "uuid",
                },
                {
                    name: "user_id",
                    type: "uuid",
                }
            ],
            foreignKeys: [
                {
                    name: "FKUser",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("passwordtoken");
    }

}
