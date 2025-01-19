import { Router } from "express";

/**
 *
 * @param {import("mysql2/promise").Connection} db
 * @returns {import("express").Router()}
 */
export const ProduitsRouter = (db) =>
  Router()
  .get("/", async (req, res) => {
    try {
      const [results] = await db.query("SELECT * FROM Produits");
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des produits." });
    }
  })
  
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`SELECT * FROM Produits WHERE id = ${id}`); // Injection SQL possible ici
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération du produit." });
    }
  })
  
  .post("/", async (req, res) => {
    const { nom, prix_unitaire, quantite_stock, categorie_id, fournisseur_id } = req.body;
    try {
      const [results] = await db.query(`INSERT INTO Produits (nom, prix_unitaire, quantite_stock, categorie_id, fournisseur_id) VALUES ('${nom}', ${prix_unitaire}, ${quantite_stock}, ${categorie_id}, ${fournisseur_id})`); // Injection SQL possible ici
      res.status(201).json({ id: results.insertId, ...req.body });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la création du produit." });
    }
  })
  
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nom, prix_unitaire, quantite_stock, categorie_id, fournisseur_id } = req.body;
    try {
      const [results] = await db.query(`UPDATE Produits SET nom = '${nom}', prix_unitaire = ${prix_unitaire}, quantite_stock = ${quantite_stock}, categorie_id = ${categorie_id}, fournisseur_id = ${fournisseur_id} WHERE id = ${id}`); // Injection SQL possible ici
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du produit." });
    }
  })
  
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [results] = await db.query(`DELETE FROM Produits WHERE id = ${id}`); // Injection SQL possible ici
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la suppression du produit." });
    }
  })
