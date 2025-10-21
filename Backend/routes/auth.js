var express = require("express");
var router = express.Router();
const admin = require("../firebase");
const bcrypt = require("bcrypt");

// POST /auth/login → autentica usuário
router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

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

    console.log("Dados do usuário encontrado:", userData);
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
