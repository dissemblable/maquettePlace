import { Router } from "express";

/**
 *
 * @param {import("mysql2/promise").Connection} db
 * @returns {import("express").Router()}
 */
export const FournisseursRouter = (db) =>
  Router()
  .get("/", async (req, res) => {
    try {
      const [results] = await db.query("SELECT * FROM Fournisseurs");
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des Fournisseurs." });
    }
  })
  
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`SELECT * FROM Fournisseurs WHERE id = ${id}`);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération du Fournisseurs." });
    }
  })
  
  .post("/", async (req, res) => {
    const { nom, adresse, telephone } = req.body;
    try {
      const [results] = await db.query(`INSERT INTO Fournisseurs (nom, adresse, telephone) VALUES ('${nom}', ${adresse}, ${telephone})`);
      res.status(201).json({ id: results.insertId, ...req.body });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la création du Fournisseurs." });
    }
  })
  
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nom, adresse, telephone } = req.body;
    try {
      const [results] = await db.query(`UPDATE Fournisseurs SET nom = '${nom}', adresse = ${adresse}, telephone = ${telephone} WHERE id = ${id}`);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du Fournisseurs." });
    }
  })
  
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`DELETE FROM Fournisseurs WHERE id = ${id}`);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la suppression du Fournisseurs." });
    }
  })
