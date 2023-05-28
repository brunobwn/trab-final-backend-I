import 'dotenv/config';
import { DataSource, DataSourceOptions } from "typeorm";
import { UserEntity } from './entities/user.entity';
import { MessageEntity } from './entities/messages.entity';

const config: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
    entities: [UserEntity, MessageEntity],
    migrations: ["./dist/database/migrations/*.js"],
	synchronize: false,
	logging: false,
	ssl: {
		rejectUnauthorized: false,
	},
};

export const dataSource = new DataSource(config);