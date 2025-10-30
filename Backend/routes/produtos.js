const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // se estiver usando Node <18
const admin = require('../firebase'); // seu setup do Firebase

// Responder preflight OPTIONS
router.options('/register', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);
});

router.post('/products', async (req, res) => {
  try {
    const { id, nome, preco, descricao, imagem } = req.body;

    if (!id || !nome || !preco) {
      return res.status(400).json({ error: 'ID, nome e preço são obrigatórios.' });
    }

    const productData = {
      id,
      nome,
      preco,
      descricao: descricao || null,
      imagem: imagem || null,
      criadoEm: new Date(),
    };

    const docRef = await admin.firestore().collection('produtos').add(productData);

    return res.status(201).json({ uid: docRef.id, ...productData });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ error: 'Erro ao cadastrar produto' });
  }
});

router.get("/products", async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('produtos').get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const produtos = snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});


module.exports = router;
