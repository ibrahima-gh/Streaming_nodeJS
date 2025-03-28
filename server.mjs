// filepath: /c:/Users/user/Desktop/Streaming_nodeJS/server.mjs
import pool from './db.js';

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erreur de test PostgreSQL", err);
  } else {
    console.log("PostgreSQL connecté :", res.rows[0]);
  }
});