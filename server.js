import express from 'express';
import session from 'express-session';
import cors from 'cors';
import authRoutes from './src/router/authRoutes.js';
import { pool } from './src/clients/supabase.js';

const app = express();
const PORT = process.env.SERVER_PORT;

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: 'secret', // Change cette valeur en prod
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get('/films', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM film');
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aucun film trouvé' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur de base de données:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des films', error });
  }
});

app.get('/films/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await pool.query(
      'SELECT * FROM film WHERE id_categorie = $1', [categoryId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aucun film trouvé pour cette catégorie' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur de base de données:', error);  // Log l'erreur pour un débogage plus facile
    res.status(500).json({ message: 'Erreur lors de la récupération des films', error });
  }
});

app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});