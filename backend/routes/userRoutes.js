// src/router/userRoutes.js
import express from "express";
import { pool } from "../clients/supabase.js";

const router = express.Router();

// GET /user/:id
router.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM users WHERE id_utilisateur = $1;", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// GET /users (Admin uniquement)
router.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users;");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// POST /user (Créer un utilisateur)
router.post("/user", async (req, res) => {
    try {
        const { username, email, password, id_abonnement } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (username, email, password, id_abonnement) VALUES ($1, $2, $3, $4) RETURNING *;",
            [username, email, hashedPassword, id_abonnement]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// PUT /user/:id/update-info
router.put("/user/:id/update-info", async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, id_abonnement } = req.body;

        const result = await pool.query(
            "UPDATE users SET username = $1, email = $2, id_abonnement = $3 WHERE id_utilisateur = $4 RETURNING *;",
            [username, email, id_abonnement, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// DELETE /user/:id
router.delete("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query("DELETE FROM users WHERE id_utilisateur = $1 RETURNING *;", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

export default router;