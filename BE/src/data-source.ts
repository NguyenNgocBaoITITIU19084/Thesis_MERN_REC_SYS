import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from 'dotenv';

import { Brands } from "./entity/Brands";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_LOCALHOST,
    port: process.env.DB_PORT,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
    synchronize: true,
    logging: true,
})