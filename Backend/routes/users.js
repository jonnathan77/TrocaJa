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

router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, phone, userType, businessName, address, cnpj } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // console.log("Dados do usuário recebido:", req.body);

    if (userType === 'provider') {
      // Se for prestador, salva na coleção 'oficinas'
      const officeData = {
        email,
        passwordHash,
        nome: fullName || null,
        telefone: phone || null,
        businessName: businessName || null,
        address: address || null,
        cnpj: cnpj || null,
        criadoEm: new Date(),
        userType
      };

      const docRef = await admin.firestore().collection('oficinas').add(officeData);
      return res.status(201).json({ uid: docRef.id, ...officeData });

    } else {
      // Usuário comum continua em 'usuarios'
      const userData = {
        email,
        passwordHash,
        nome: fullName || null,
        telefone: phone || null,
        userType,
        criadoEm: new Date()
      };

      const docRef = await admin.firestore().collection('usuarios').add(userData);
      return res.status(201).json({ uid: docRef.id, ...userData });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});



// POST /auth/login → autentica usuário
router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    console.log("Dados do usuário encontrado:", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // Busca usuário pelo email
    const snapshot = await admin
      .firestore()
      .collection("usuarios")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const doc = snapshot.docs[0];
    const userData = doc.data();

    // Compara senha com hash
    const isValid = await bcrypt.compare(password, userData.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Monta usuário sem senha
    const user = {
      uid: doc.id,
      email: userData.email,
      nome: userData.nome,
    };

    res.json(user);
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

module.exports = router;
