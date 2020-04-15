const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Conexão MongoDB
mongoose.connect('mongodb+srv://admin:admin@twitterclone-60cwf.mongodb.net/test?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// next = seguir fluxo
app.use((req, res, next) => {
  // Disponibilizar ao socket acesso a todas rotas
  req.io = io;

  return next();
});

app.use(cors());
// Requisições com corpo no formato json
app.use(express.json());
app.use(require('./routes'));

server.listen(3333);