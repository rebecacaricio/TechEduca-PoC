const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT
    )
  `);

  db.run(`INSERT OR IGNORE INTO courses (id, title, description) VALUES 
    (1, 'HTML para Iniciantes', 'Aprenda HTML do zero.'),
    (2, 'CSS Básico', 'Aprenda a estilizar páginas com CSS.'),
    (3, 'JavaScript Essencial', 'Lógica e manipulação de DOM.')
  `);
});

module.exports = db;