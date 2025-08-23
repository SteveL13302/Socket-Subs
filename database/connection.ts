import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT, DB_PORT } = process.env;

const database = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASS as string,
    {
        host: DB_HOST,
        dialect: DB_DIALECT as any || 'mysql',
        port: Number(DB_PORT),
        logging: false,
    }
);

export default database;