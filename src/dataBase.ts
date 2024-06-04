import { DataSource } from "typeorm";
import { User } from "./entity/userEntity";
import * as dotenv from 'dotenv'

dotenv.config()

const {MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD} = process.env

export const DB = new DataSource({
  type: "mysql",
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT || "5432"),
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  logging: true,
  entities: [User],
  synchronize: true
})