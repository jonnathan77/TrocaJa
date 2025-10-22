// firebase.js
const admin = require("firebase-admin");

// ⚠️ Baixe o arquivo JSON da sua conta de serviço pelo Console do Firebase
// (Configurações do projeto > Contas de serviço > Gerar chave privada)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
