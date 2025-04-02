import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('🟢 Connexion réussie ! Heure du serveur PostgreSQL :', res.rows[0].now);
  } catch (error) {
    console.error('🔴 Erreur de connexion :', error.message);
  }
}

testConnection();

const query = (text, params) => pool.query(text, params);

// Vérifie que l'export de pool est correct ici
export { pool, query };