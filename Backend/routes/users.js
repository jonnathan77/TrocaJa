// routes/users.js
const express = require('express');
const router = express.Router();
const admin = require('../firebase'); // seu setup do Firebase
const bcrypt = require('bcrypt');

// Responder preflight OPTIONS
router.options('/register', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);
});

// POST /users/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, nome } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Salva no Firestore
    const docRef = await admin.firestore().collection('usuarios').add({
      email,
      passwordHash,
      nome: nome || null,
      criadoEm: new Date(),
    });

    res.status(201).json({ uid: docRef.id, email, nome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

module.exports = router;
