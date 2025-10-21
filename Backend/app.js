// app.js
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const oficinaRouter = require('./routes/oficina');

const app = express();

// ------------------------
// 1️⃣ Configuração CORS
// ------------------------
app.use(cors({
  origin: 'http://localhost:8100', // endereço do Ionic
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

// Permitir preflight OPTIONS globalmente
app.options('*', cors());

// ------------------------
// 2️⃣ Middlewares
// ------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ------------------------
// 3️⃣ Rotas
// ------------------------
app.use('/users', usersRouter);

app.use('/oficina', oficinaRouter);
// ------------------------
// 4️⃣ Tratamento 404
// ------------------------
app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// ------------------------
// 5️⃣ Tratamento de erros
// ------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

// ------------------------
// 6️⃣ Exportar app
// ------------------------
module.exports = app;
