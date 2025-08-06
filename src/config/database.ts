import { DataSource } from 'typeorm';
require('dotenv').config();

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [],
    subscribers: []
});

export default PostgresDataSource;
