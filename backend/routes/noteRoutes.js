import express from "express";
import { query } from "../clients/supabase.js";

const router = express.Router();

// Récupérer les notes d'un film
router.get("/notes/film/:id", async (req, res) => {
    try {
        const result = await query("SELECT * FROM note WHERE id_film = $1", [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// Ajouter une note
router.post("/notes", async (req, res) => {
    const { note, commentaire, id_film, id_utilisateur } = req.body;
    try {
        const result = await query(
            "INSERT INTO note (note, commentaire, id_film, id_utilisateur) VALUES ($1, $2, $3, $4) RETURNING *",
            [note, commentaire, id_film, id_utilisateur]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// Supprimer une note
router.delete("/notes/:id", async (req, res) => {
    try {
        await query("DELETE FROM note WHERE id_note = $1", [req.params.id]);
        res.status(200).json({ message: "Note supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

export default router;