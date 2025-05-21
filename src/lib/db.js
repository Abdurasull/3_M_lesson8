import mysql from "mysql2/promise";
import config from "config";

console.log(config.get("DB_HOST"));

export const connection = await mysql.createConnection({
    host: config.get("DB_HOST"),
    user: config.get("DB_USER"),
    password: config.get("DB_PASS"),
    database: config.get("DB_NAME"),
});

