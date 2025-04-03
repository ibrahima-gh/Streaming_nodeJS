import express from "express";
import { pool } from "../clients/supabase.js";

const router = express.Router();

// Récupérer tous les films
router.get("/films", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM film;");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

router.get("/film/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM film WHERE id_film = $1;", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Film non trouvé" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

router.get("/films/recommanded", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM film ORDER BY RANDOM() LIMIT 5;");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// Ajouter un film
router.post("/films", async (req, res) => {
    try {
        const { title, description, date_sortie, acteurs, duree, id_categorie, url_annonce, url_image } = req.body;

        const result = await pool.query(
            "INSERT INTO film (title, description, date_sortie, acteurs, duree, id_categorie, url_annonce, url_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
            [title, description, date_sortie, acteurs, duree, id_categorie, url_annonce, url_image]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// Mettre à jour un film
router.put("/films/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date_sortie, acteurs, duree, id_categorie, url_annonce, url_image } = req.body;

        const result = await pool.query(
            "UPDATE film SET title = $1, description = $2, date_sortie = $3, acteurs = $4, duree = $5, id_categorie = $6, url_annonce = $7, url_image = $8 WHERE id_film = $9 RETURNING *;",
            [title, description, date_sortie, acteurs, duree, id_categorie, url_annonce, url_image, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// Supprimer un film
router.delete("/films/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query("DELETE FROM film WHERE id_film = $1;", [id]);
        res.status(200).json({ message: "Film supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

export default router;