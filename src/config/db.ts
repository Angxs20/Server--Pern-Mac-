// src/config/db.ts
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Product from "../models/Producto.mo"; // <-- esto debe existir

dotenv.config();

const db = new Sequelize(process.env.DB_URL!, {
  dialect: "postgres", // explícito, aunque ya lo infiere
  logging: false,
  models: [Product], // <-- Aquí es donde conectas el modelo con Sequelize
});

export default db;
