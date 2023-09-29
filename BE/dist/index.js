"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
data_source_1.AppDataSource.initialize().then(() => {
    console.log('⚡️[server]: Connect to MySQL database!');
}).catch((error) => console.error("⚡️[server]: Error during Data Source initialization", error));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
