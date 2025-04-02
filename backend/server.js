import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import filmRoutes from "./routes/filmRoutes.js";
import abonnementRoutes from "./routes/abonnementRoutes.js";
import categorieRoutes from "./routes/categoriesRoutes.js";
import { pool } from "./clients/supabase.js"; // Pool pour PostgreSQL

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Configuration CORS
app.use(
    cors({
        origin: "http://localhost:5173", // Frontend
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Middleware pour lire les JSON
app.use(express.json());

// Exemple d'utilisation directe de `pool`
app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.status(200).json({
            message: "Connexion à la base de données réussie",
            data: result.rows,
        });
    } catch (error) {
        console.error("Erreur avec la base de données : ", error);
        res.status(500).json({ error: "Erreur au niveau du serveur" });
    }
});

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", abonnementRoutes);
app.use("/api", filmRoutes);
app.use("/api", categorieRoutes);

// Middleware pour la session
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});