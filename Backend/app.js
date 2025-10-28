// app.js
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const oficinaRouter = require('./routes/oficina');
const veiculosRouter = require('./routes/veiculos');


const path = require('path');
const fs = require('fs');

const app = express();

// ------------------------
// 1️⃣ Configuração CORS (mais permissiva para dev)
// ------------------------
// Durante desenvolvimento o front pode rodar em vários origins
// (ionic dev server, capacitor, emulador Android, etc). Aqui permitimos
// dinamicamente alguns origins comuns e caímos para permissivo em dev.
const allowedOrigins = [  
  'https://troca-ja.vercel.app', // 🌐 Produção (Frontend)
  'https://www.troca-ja.vercel.app',
  'http://localhost:8100', // Ionic dev server
  'http://localhost:4200', // Angular default
  'http://localhost',
  'capacitor://localhost',
  'ionic://localhost',
  'http://10.0.2.2:8100', // Android emulator -> host machine
];

app.use(cors({
  origin: function(origin, callback) {
    // permitir requests sem origin (ferramentas como curl, or same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    // se estiver em ambiente de desenvolvimento, permitir tudo (conveniente)
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    // em produção negar
    callback(new Error('Origin not allowed by CORS'));
  },
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
app.use('/veiculos', veiculosRouter);

// ------------------------
// 3.1️⃣ Servir front-end estático (opcional)
// ------------------------
// Se o diretório de build do front-end existir (Frontend/www), servimos
// os arquivos estáticos para que acessar `/` retorne a SPA.
const frontendDist = path.resolve(__dirname, '..', 'Frontend', 'www');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  // Servir index.html para rotas que não batem com API — possibilita SPA routing
  app.get('*', (req, res, next) => {
    // se a rota começa com /veiculos, /users ou /oficina, deixa o next() para as rotas da API
    if (req.path.startsWith('/veiculos') || req.path.startsWith('/users') || req.path.startsWith('/oficina')) {
      return next();
    }

    // se aceitar html, devolve index.html
    if (req.accepts('html')) {
      return res.sendFile(path.join(frontendDist, 'index.html'));
    }

    next();
  });
}

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
