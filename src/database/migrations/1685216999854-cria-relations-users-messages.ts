import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class criaRelationsUsersMessages1685216999854 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'messages',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('post', 'FK_post_user');
	}
    
}
