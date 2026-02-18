import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { getDatabaseConfig } from './config/database.config';

dotenv.config()

const databaseConfig = getDatabaseConfig()

export const AppDataSource = new DataSource({
    type: 'mysql',
    ...databaseConfig,
    migrations: [__dirname + '/db/migrations/*{.js,.ts}'],
})