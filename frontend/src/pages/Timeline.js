import React, { useState, useEffect } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import Tweet from '../components/Tweet';
import twitterLogo from '../twitter.svg';
import './Timeline.css';

function Timeline() {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('tweets');

      setTweets(response.data);
    }

    loadDevs();
  }, [tweets]);

  useEffect(() => {
    // Conexão Websocket
    const io = socket('http://localhost:3333');

    // Ouvir requisição 'tweet' do websocket da api
    io.on('tweet', data => {
      setTweets([data, ...tweets]);
    });

    // Ouvir requisição 'like' do websocket da api
    io.on('like', data => {
      setTweets(tweet => (tweet._id === data._id ? data : tweet));
    });
  }, [tweets]);


  async function handleNewTweet(e) {
    if (e.keyCode !== 13) return;

    const content = newTweet;
    // Obter username do localStorage e associar ao author
    const author = localStorage.getItem('@GoTwitter:twitter_username');

    // Enviar params. content, author na rota de tweets da api
    await api.post('tweets', { content, author })

    setNewTweet('');
  }

  return (
    <div className="timeline-wrapper">
      <img height={24} src={ twitterLogo } alt="GoTwitter" />

      <form>
        <textarea
          value={ newTweet }
          onChange={e => setNewTweet(e.target.value)}
          onKeyDown={ handleNewTweet }
          placeholder="O que está acontecendo?"
        >
        </textarea>
      </form>

      <ul className="tweet-list">
        {/* Mapear tweets para cada item */}
        { tweets.map(tweet => (
          <Tweet key={ tweet._id } tweet={ tweet } />
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
