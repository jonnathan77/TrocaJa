// firebase.js
const admin = require("firebase-admin");

// ⚠️ Baixe o arquivo JSON da sua conta de serviço pelo Console do Firebase
// (Configurações do projeto > Contas de serviço > Gerar chave privada)
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
