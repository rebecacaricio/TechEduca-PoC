const db = require('../database/db');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

  db.run(query, [name, email, password], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Usuário cadastrado com sucesso', id: this.lastID });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

  db.get(query, [email, password], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: 'Credenciais inválidas' });
    res.json({ message: 'Login realizado com sucesso', user: row });
  });
};