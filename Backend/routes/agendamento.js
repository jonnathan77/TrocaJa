const express = require('express');
const router = express.Router();
const admin = require('../firebase'); // seu setup do Firebase

// Responder preflight OPTIONS
router.options('/agendamentos', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);
});

// POST /agendamentos - criar um novo agendamento
router.post('/agendamentos', async (req, res) => {
  try {
    const { itens, total, brand, model, year, oficina, dataAgendamento, observacoes } = req.body;

    if (!itens || !total || !brand || !model || !year || !oficina || !dataAgendamento) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const agendamentoData = {
      itens,
      total,
      brand,
      model,
      year,
      oficina,
      dataAgendamento: new Date(dataAgendamento),
      observacoes: observacoes || '',
      criadoEm: new Date(),
    };

    const docRef = await admin.firestore().collection('agendamentos').add(agendamentoData);

    return res.status(201).json({ uid: docRef.id, ...agendamentoData });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return res.status(500).json({ error: 'Erro ao criar agendamento' });
  }
});

// GET /agendamentos - listar todos os agendamentos
router.get('/agendamentos', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('agendamentos').orderBy('criadoEm', 'desc').get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const agendamentos = snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(agendamentos);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
});

module.exports = router;
