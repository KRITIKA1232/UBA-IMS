import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Internship } from "../entities/Internship";
import path from "path";

dotenv.config(); // ✅ Load environment variables

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, Internship],  // ✅ Ensure both entities are listed
    migrations: [path.join(__dirname, "../migrations/*.js")],
    synchronize: false,
    logging: true,
});

export default AppDataSource;
