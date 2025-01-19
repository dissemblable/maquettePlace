import { Router } from "express";

/**
 *
 * @param {import("mysql2/promise").Connection} db
 * @returns {import("express").Router()}
 */
export const ClientsRouter = (db) =>
  Router()
  .get("/", async (req, res) => {
    try {
      const [results] = await db.query("SELECT * FROM Clients");
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des Clients." });
    }
  })
  
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`SELECT * FROM Clients WHERE id = ${id}`);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération du Client." });
    }
  })
  
  .post("/", async (req, res) => {
    const { nom, adresse, email, telephone } = req.body;
    try {
      const [results] = await db.query(`INSERT INTO Clients (nom, adresse, email, telephone) VALUES ('${nom}', ${adresse}, ${email}, ${telephone})`);
      res.status(201).json({ id: results.insertId, ...req.body });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la création du client." });
    }
  })
  
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nom, adresse, email, telephone } = req.body;
    try {
      const [results] = await db.query(`UPDATE Clients SET nom = '${nom}', adresse = ${adresse}, email = ${email}, telephone = ${telephone} WHERE id = ${id}`);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du Clients." });
    }
  })
  
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`DELETE FROM Clients WHERE id = ${id}`);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la suppression du Clients." });
    }
  })
