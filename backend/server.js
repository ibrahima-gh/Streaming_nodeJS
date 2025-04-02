import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
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

// ✅ **Ajout du middleware de session AVANT les routes**
app.use(
    session({
        secret: "secret",  // 🔒 Change cette valeur en une vraie clé secrète
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // ⚠️ Mettre `secure: true` en production (HTTPS requis)
    })
);

// Routes (après session)
app.use("/api", authRoutes);
app.use("/api", abonnementRoutes);
app.use("/api", filmRoutes);
app.use("/api", categorieRoutes);

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});