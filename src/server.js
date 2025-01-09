import cors from "cors";
import express from "express";
import mysql from "mysql2/promise";
import { apiRouter } from "./routes/api.js";

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
  .use("/api/test", apiRouter(connection))
  .listen(port);
