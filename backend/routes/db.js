const { Pool } = require('pg');

// Configuration de la connexion
const pool = new Pool({
  user: 'postgres',          // Utilisateur PostgreSQL (exemple : 'postgres')
  host: 'localhost',         // Hôte de la base (exemple : 'localhost')
  database: 'library_db',      // Nom de la base de données
  password: 'Soleil63&', // Mot de passe PostgreSQL
  port: 5432,                // Port par défaut de PostgreSQL
});

module.exports = pool;