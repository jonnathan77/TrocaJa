const admin = require('firebase-admin');
const dados = require('./dados.json');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importarColecao(nomeColecao, arrayDocumentos) {
  const batch = db.batch();
  arrayDocumentos.forEach(doc => {
    const docRef = db.collection(nomeColecao).doc(doc.id.toString());
    batch.set(docRef, doc);
  });
  await batch.commit();
  console.log(`Coleção "${nomeColecao}" importada com sucesso!`);
}

async function importarTudo() {
  for (const colecao in dados) {
    await importarColecao(colecao, dados[colecao]);
  }
  console.log('Todos os dados importados!');
}

importarTudo().catch(console.error);
