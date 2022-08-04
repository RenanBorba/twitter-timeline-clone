<div align="center">

# Projeto - API REST Aplicação Twitter Clone

</div>

<br>

<div align="center">

[![Generic badge](https://img.shields.io/badge/Made%20by-Renan%20Borba-purple.svg)](https://shields.io/) [![Build Status](https://img.shields.io/github/stars/RenanBorba/twitter-clone.svg)](https://github.com/RenanBorba/twitter-clone) [![Build Status](https://img.shields.io/github/forks/RenanBorba/twitter-clone.svg)](https://github.com/RenanBorba/twitter-clone) [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/) [![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

<br>

![000](https://user-images.githubusercontent.com/48495838/80153492-04c69a80-8594-11ea-94de-2a5552189088.jpg)

</div>

<br>

API REST em Node.js MVC para clone da principal interface do Twitter (Timeline), além da interface inicial de login, possibilitando aos usuários enviar e receber atualizações pessoais de outros contatos. Permite, assim, a atualização em tempo real dos likes nos tweets via WebSocket.<br>
O projeto é voltado para adaptação da aplicação da Semana Omnistack 5.0 da Rocketseat.

<br><br>

## :rocket: Tecnologias
<ul>
  <li>Nodemon</li>
  <li>MongoDB</li>
  <li>Mongoose</li>
  <li>Routes</li>
  <li>Express</li>
  <li>Cors</li>
  <li>socket.io Websocket</li>
</ul>

<br><br>

## :arrow_forward: Start
<ul>
  <li>npm install</li>
  <li>npm run dev / npm dev</li>
</ul>

<br><br><br>

## :mega: ⬇ Abaixo as principais estruturas:

<br><br><br>

## src/routes.js
```js
const express = require('express');

const routes = express.Router();

const TweetController = require('./controllers/TweetController');
const LikeController = require('./controllers/LikeController');

// Rotas HTTP
routes.get('/tweets', TweetController.index);
routes.post('/tweets', TweetController.store);
routes.post('/likes/:id', LikeController.store);

module.exports = routes;
```

<br><br>

## src/models/Tweet.js
```js
const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
  author: String,
  content: String,
  likes: {
    type: Number,
    default: 0,
  },
  // ordenar e evitar redundância (por data atual)
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Tweet', TweetSchema);
```

<br><br>

## src/controllers/TweetController.js
```js
const Tweet = require("../models/Tweet");

module.exports = {
  // Método Listar
  async index (req, res) {
    // Buscar todos tweets por ordenação do model
    const tweets = await Tweet.find({}).sort("-createdAt");

    return res.json(tweets);
  },

  // Método Criar
  async store(req, res) {
    // req.body param (criar por param. corpo de requisição)
    const tweet = await Tweet.create(req.body);

    // Enviar requisição 'tweet'
    req.io.emit('tweet', tweet);

    return res.json(tweet);
  }
};
```

<br><br>

## src/controllers/LikeController.js
```js
const Tweet = require('../models/Tweet');

module.exports = {
  // Método Criar
  async store(req, res) {
    // Buscar tweet por id
    const tweet = await Tweet.findById(req.params.id);

    // Acrescentar mais um like ao tweet
    tweet.set({ likes: tweet.likes + 1 });

    await tweet.save();

    // Enviar requisição 'like'
    req.io.emit('like', tweet);

    return res.json(tweet);
  }
};
```
