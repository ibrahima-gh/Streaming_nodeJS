import express from "express";
import { query } from "../clients/supabase.js";

const router = express.Router();

// Récupérer tous les abonnements
router.get("/abonnements/all", async (req, res) => {
    try {
        const result = await query("SELECT * FROM abonnement");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// Créer un abonnement
router.post("/abonnements", async (req, res) => {
    const { type, prix, date_debut, date_fin, statut } = req.body;
    try {
        const result = await query(
            "INSERT INTO abonnement (type, prix, date_debut, date_fin, statut) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [type, prix, date_debut, date_fin, statut]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// Mettre à jour un abonnement
router.put("/abonnements/:id", async (req, res) => {
    const { type, prix, date_debut, date_fin, statut } = req.body;
    try {
        const result = await query(
            "UPDATE abonnement SET type = $1, prix = $2, date_debut = $3, date_fin = $4, statut = $5 WHERE id_abonnement = $6 RETURNING *",
            [type, prix, date_debut, date_fin, statut, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

// Supprimer un abonnement
router.delete("/abonnements/:id", async (req, res) => {
    try {
        await query("DELETE FROM abonnement WHERE id_abonnement = $1", [req.params.id]);
        res.status(200).json({ message: "Abonnement supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

export default router;