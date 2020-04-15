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