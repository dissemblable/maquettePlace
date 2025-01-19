import cors from "cors";
import express from "express";
import mysql from "mysql2/promise";
import {CategoriesRouter} from "./routes/Categories.js";
import {ProduitsRouter} from "./routes/Produits.js";
import {ClientsRouter} from "./routes/Clients.js";
import {CommandesRouter} from "./routes/Commandes.js";
import {FournisseursRouter} from "./routes/Fournisseurs.js";
import {Lignes_CommandesRouter} from "./routes/Lignes_Commande.js";
import {Produits_FournisseursRouter} from "./routes/Produits_Fournisseurs.js";

const app = express();
const port = 3001;

const connection = await mysql.createConnection({
  host: "localhost",
  database: "GestionStock",
  user: "root",
  password: "rootpassword",
  port: "3306",
  multipleStatements: true,
});

console.log("Server is running on port 3001")

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
  .listen(port);
