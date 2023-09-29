import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import {AppDataSource} from './data-source'
import { error } from 'console';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
 
 
 
AppDataSource.initialize().then(() => {
  console.log('⚡️[server]: Connect to MySQL database!')
}).catch((error) => console.error("⚡️[server]: Error during Data Source initialization", error))

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});