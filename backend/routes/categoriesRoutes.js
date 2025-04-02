import express from "express";
import { query } from "../clients/supabase.js";

const router = express.Router();

// Récupérer toutes les catégories
router.get("/categories", async (req, res) => {
    try {
        const result = await query("SELECT * FROM categorie");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// Ajouter une catégorie
router.post("/categories", async (req, res) => {
    const { nom } = req.body;
    try {
        const result = await query("INSERT INTO categorie (nom) VALUES ($1) RETURNING *", [nom]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// Supprimer une catégorie
router.delete("/categories/:id", async (req, res) => {
    try {
        await query("DELETE FROM categorie WHERE id_categorie = $1", [req.params.id]);
        res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

export default router;