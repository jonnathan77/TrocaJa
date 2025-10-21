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


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const snapshot = await admin
      .firestore()
      .collection("oficinas")
      .where("id", "==", Number(id)) // ou id se for string
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Oficina não encontrada" });
    }

    const doc = snapshot.docs[0];
    const oficinaData = doc.data();
    if (oficinaData.servicosOferecidos?.length > 0) {
        
        const servicosPadraoRef = admin.firestore().collection("servicos");
        const servicosSnapshot = await servicosPadraoRef
        .where("id", "in", oficinaData.servicosOferecidos)
        .get();
        
        console.log("serv:", servicosSnapshot.docs.map((s) => s.data()));
        oficinaData.servicosOferecidos = servicosSnapshot.docs.map((s) => s.data());
    } else {
      oficinaData.servicosOferecidos = [];
    }

    res.json(oficinaData);
  } catch (error) {
    console.error("Erro ao buscar oficina:", error);
    res.status(500).json({ error: "Erro ao buscar oficina" });
  }
});

module.exports = router;
