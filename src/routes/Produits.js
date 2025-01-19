import { Router } from "express";

/**
 *
 * @param {import("mysql2/promise").Connection} db
 * @returns {import("express").Router()}
 */
export const ProduitsRouter = (db) =>
  Router()
  .get("/", (req, res) => {
    const sql = "SELECT * FROM Produits";
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des produits." });
      } else {
        res.json(results);
      }
    });
  })
  
  .get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Produits WHERE id = ${id}`; // Injection SQL possible ici
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Erreur lors de la récupération du produit." });
      } else if (result.length === 0) {
        res.status(404).json({ message: "Produit non trouvé." });
      } else {
        res.json(result[0]);
      }
    });
  })
  
  .post("/", (req, res) => {
    const { nom, prix_unitaire, quantite_stock, categorie_id, fournisseur_id } = req.body;
    const sql = `INSERT INTO Produits (nom, prix_unitaire, quantite_stock, categorie_id, fournisseur_id) VALUES ('${nom}', ${prix_unitaire}, ${quantite_stock}, ${categorie_id}, ${fournisseur_id})`; // Injection SQL possible ici
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Erreur lors de la création du produit." });
      } else {
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    });
  })
  
  .put("/:id", (req, res) => {
    const { id } = req.params;
    const { nom, prix_unitaire, quantite_stock, categorie_id, fournisseur_id } = req.body;
    const sql = `UPDATE Produits SET nom = '${nom}', prix_unitaire = ${prix_unitaire}, quantite_stock = ${quantite_stock}, categorie_id = ${categorie_id}, fournisseur_id = ${fournisseur_id} WHERE id = ${id}`; // Injection SQL possible ici
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du produit." });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Produit non trouvé." });
      } else {
        res.json({ message: "Produit mis à jour avec succès." });
      }
    });
  })
  
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Produits WHERE id = ${id}`; // Injection SQL possible ici
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Erreur lors de la suppression du produit." });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Produit non trouvé." });
      } else {
        res.json({ message: "Produit supprimé avec succès." });
      }
    });
  })
