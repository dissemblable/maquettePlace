import fs from "fs/promises";
import path from "path";
import cors from "cors";
import express from "express";
import mysql from "mysql2/promise";
import { CategoriesRouter } from "./routes/Categories.js";
import { ProduitsRouter } from "./routes/Produits.js";
import { ClientsRouter } from "./routes/Clients.js";
import { CommandesRouter } from "./routes/Commandes.js";
import { FournisseursRouter } from "./routes/Fournisseurs.js";
import { Lignes_CommandesRouter } from "./routes/Lignes_Commande.js";
import { Produits_FournisseursRouter } from "./routes/Produits_Fournisseurs.js";

const app = express();
const port = 3001;

const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "rootpassword",
  port: "3306",
  multipleStatements: true,
};

async function initializeDatabase(connection) {
  try {
    const upSql = await fs.readFile(path.resolve("up.sql"), "utf-8");
    const feedSql = await fs.readFile(path.resolve("feed_database.sql"), "utf-8");

    console.log("Initializing database...");
    await connection.query(upSql);
    console.log("Database schema created.");
    await connection.query(feedSql);
    console.log("Database populated with initial data.");
  } catch (error) {
    console.error("Error during database initialization:", error.message);
    process.exit(1);
  }
}

async function startServer() {
  const connection = await mysql.createConnection(connectionConfig);

  await initializeDatabase(connection);

  console.log("Starting server...");
  app
    .use(cors())
    .use(express.json())
    .use("/api/categories", CategoriesRouter(connection))
    .use("/api/produits", ProduitsRouter(connection))
    .use("/api/clients", ClientsRouter(connection))
    .use("/api/commandes", CommandesRouter(connection))
    .use("/api/fournisseurs", FournisseursRouter(connection))
    .use("/api/lignes_commandes", Lignes_CommandesRouter(connection))
    .use("/api/produit_fournisseur", Produits_FournisseursRouter(connection))
    .listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err.message);
});
