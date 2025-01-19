import { Router } from "express";

/**
 *
 * @param {import("mysql2/promise").Connection} db
 * @returns {import("express").Router()}
 */
export const Produits_FournisseursRouter = (db) =>
  Router()
  .get("/", async (req, res) => {
    try {
      const [results] = await db.query("SELECT * FROM Produits_Fournisseurs");
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des produits_Fournisseurs." });
    }
  })
  
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`SELECT * FROM Produits_Fournisseurs WHERE id = ${id}`);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération du produit_Fournisseurs." });
    }
  })
  
  .post("/", async (req, res) => {
    const { produit_id, fournisseur_id } = req.body;
    try {
      const [results] = await db.query(`INSERT INTO Produits_Fournisseurs (nom, produit_id fournisseur_id) VALUES ('${produit_id}', ${fournisseur_id})`);
      res.status(201).json({ id: results.insertId, ...req.body });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la création du produit_Fournisseurs." });
    }
  })
  
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const { produit_id, fournisseur_id } = req.body;
    try {
      const [results] = await db.query(`UPDATE Produits_Fournisseurs SET produit_id = '${produit_id}', fournisseur_id = ${fournisseur_id} WHERE id = ${id}`);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du Produits_Fournisseurs." });
    }
  })
  
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`DELETE FROM Produits_Fournisseurs WHERE id = ${id}`);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la suppression du Produits_Fournisseurs." });
    }
  })
