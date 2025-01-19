import { Router } from "express";

/**
 *
 * @param {import("mysql2/promise").Connection} db
 * @returns {import("express").Router()}
 */
export const CommandesRouter = (db) =>
  Router()
  .get("/", async (req, res) => {
    try {
      const [results] = await db.query("SELECT * FROM Commandes");
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des Commandes." });
    }
  })
  
  .get("/:id", async (req, res) => {
    try {
      const [results] = await db.query(`SELECT * FROM Commandes WHERE id = ?`,
        [req.params.id]
      );
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération du Commande." });
    }
  })
  
  .post("/", async (req, res) => {
    const { nom, date_commande, client_id } = req.body;
    try {
      const [results] = await db.query(`INSERT INTO Commandes (nom, date_commande, client_id) VALUES (?, ?, ?)`,
        [nom, date_commande, client_id]
      );
      res.status(201).json({ id: results.insertId, nom, date_commande, client_id });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la création du Commande." });
    }
  })
  
  .put("/:id", async (req, res) => {
    const { nom, date_commande, client_id } = req.body;
    try {
      const [results] = await db.query(`UPDATE Commandes SET nom = ?, date_commande = ?}, client_id = ? WHERE id = ?`,
        [nom, date_commande, client_id, req.params.id]
      );
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du Commandes." });
    }
  })
  
  .delete("/:id", async (req, res) => {
    try {
      const [results] = await db.query(`DELETE FROM Commandes WHERE id = ?`,
        [req.params.id]
      );
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la suppression du Commandes." });
    }
  })
