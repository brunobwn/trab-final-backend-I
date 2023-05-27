import 'dotenv/config';
import { DataSource, DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
    entities: ["src/database/migrations/**/*"],
    migrations: ["src/database/migrations/**/*"],
	synchronize: false,
	logging: false,
	ssl: {
		rejectUnauthorized: false,
	},
};

export const dataSource = new DataSource(config);