const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // se estiver usando Node <18

// Responder preflight OPTIONS
router.options('/register', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);
});

// GET /marcas → listar marcas
router.get('/marcas', async (req, res) => {
  try {
    const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar marcas' });
  }
});

// GET /marcas/:codigo/modelos → listar modelos de uma marca
router.get('/marcas/:codigo/modelos', async (req, res) => {
  try {
    const { codigo } = req.params;
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigo}/modelos`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar modelos' });
  }
});

// GET /marcas/:codigoMarca/modelos/:codigoModelo/anos → listar anos de um modelo
router.get('/marcas/:codigoMarca/modelos/:codigoModelo/anos', async (req, res) => {
  try {
    const { codigoMarca, codigoModelo } = req.params;
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar anos' });
  }
});

module.exports = router;
