import cors from "cors";
import express from "express";
import mysql from "mysql2/promise";
import {CategoriesRouter} from "./routes/Categories.js";
import {ProduitsRouter} from "./routes/Produits.js";

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
  .listen(port);
