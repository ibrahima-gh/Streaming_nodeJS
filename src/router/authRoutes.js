import express from 'express';
import { query } from '../clients/supabase.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Route de connexion
router.post('/login', async (req, res) => {
const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
        return res.status(400).json({ error: 'Nom d\'utilisateur ou e-mail et mot de passe requis.' });
    }

    try {
        const result = await query(
        'SELECT * FROM users WHERE email = $1 OR username = $2',
        [email || '', username || '']
        );

        if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Identifiants incorrects.' });
        }

        const user = result.rows[0];

        // Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
        return res.status(401).json({ error: 'Identifiants incorrects.' });
        }

        // Stocker l'utilisateur dans la session
        req.session.user = { id: user.id, email: user.email, username: user.username };

        res.json({ message: 'Connexion réussie', user: req.session.user });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

// Route d'inscription
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertResult = await query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    const newUser = insertResult.rows[0];

    req.session.user = { id: newUser.id, email: newUser.email, username: newUser.username };

    res.status(201).json({ message: 'Inscription réussie', user: req.session.user });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Route de déconnexion
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
    }
    res.json({ message: 'Déconnexion réussie' });
  });
});

export default router;