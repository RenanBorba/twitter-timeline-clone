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