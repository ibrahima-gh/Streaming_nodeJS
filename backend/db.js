import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
});

pool.connect()
    .then(() => console.log('Connexion réussie à PostgreSQL'))
    .catch(err => console.error('Erreur de connexion', err));

export default pool;