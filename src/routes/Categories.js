import { Router } from "express";

/**
 *
 * @param {import("mysql2/promise").Connection} db
 * @returns {import("express").Router()}
 */
export const CategoriesRouter = (db) =>
  Router()
.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM Categories");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des categories." });
  }
})

.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query(`SELECT * FROM Categories WHERE id = ${id}`);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération de la categorie." });
  }
})

.post("/", async (req, res) => {
  const { nom } = req.body;
  try {
    const [results] = await db.query(`INSERT INTO Categories (nom) VALUES ('${nom}')`);
    res.status(201).json({ id: results.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création de la categorie." });
  }
})

.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  try {
    const [results] = await db.query(`UPDATE Categories SET nom = '${nom}' WHERE id = ${id}`); 
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour de la categorie." });
  }
})

.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query(`DELETE FROM Categories WHERE id = ${id}`);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression de la Categorie." });
  }
})
