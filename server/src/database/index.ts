import { Sequelize } from 'sequelize';

require("dotenv").config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST ? String(process.env.DB_HOST) : "8000",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 4000,
  database: process.env.DB_NAME || "",
  username: process.env.DB_USER || "",
  password: process.env.DB_PASS || "",
  define: {
    underscored: true,
  },
});
