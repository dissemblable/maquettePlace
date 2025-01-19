import { Router } from "express";

/**
 *
 * @param {import("mysql2/promise").Connection} db
 * @returns {import("express").Router()}
 */
export const Lignes_CommandesRouter = (db) =>
  Router()
  .get("/", async (req, res) => {
    try {
      const [results] = await db.query("SELECT * FROM Lignes_Commandes");
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des Lignes_Commandes." });
    }
  })
  
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`SELECT * FROM Lignes_Commandes WHERE id = ${id}`);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération du Lignes_Commandes." });
    }
  })
  
  .post("/", async (req, res) => {
    const { nom, commande_id, produit_id, quantite, prix_unitaire } = req.body;
    try {
      const [results] = await db.query(`INSERT INTO Lignes_Commandes (nom, commande_id, produit_id, quantite, prix_unitaire) VALUES ('${nom}', ${commande_id}, ${produit_id}, ${quantite}, ${prix_unitaire})`);
      res.status(201).json({ id: results.insertId, ...req.body });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la création du Lignes_Commandes." });
    }
  })
  
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nom, commande_id, produit_id, quantite, prix_unitaire } = req.body;
    try {
      const [results] = await db.query(`UPDATE Lignes_Commandes SET nom = '${nom}', commande_id = ${commande_id}, produit_id = ${produit_id}, quantite = ${quantite}, prix_unitaire = ${prix_unitaire} WHERE id = ${id}`);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du Lignes_Commandes." });
    }
  })
  
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`DELETE FROM Lignes_Commandes WHERE id = ${id}`);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la suppression du Lignes_Commandes." });
    }
  })
