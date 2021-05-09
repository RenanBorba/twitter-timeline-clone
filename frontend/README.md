<div align="center">

# Projeto - Aplicação Twitter Clone Web ReactJS

</div>

<div align="center">

[![Generic badge](https://img.shields.io/badge/Made%20by-Renan%20Borba-purple.svg)](https://shields.io/) [![Build Status](https://img.shields.io/github/stars/RenanBorba/twitter-clone.svg)](https://github.com/RenanBorba/twitter-clone) [![Build Status](https://img.shields.io/github/forks/RenanBorba/twitter-clone.svg)](https://github.com/RenanBorba/twitter-clone) [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/) [![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

<br>

![000](https://user-images.githubusercontent.com/48495838/80153492-04c69a80-8594-11ea-94de-2a5552189088.jpg)

</div>

<br>

Aplicação Web em ReactJS para clone da principal interface do Twitter (Timeline), além da interface inicial de login, possibilitando aos usuários enviar e receber atualizações pessoais de outros contatos. Permite, assim, a atualização em tempo real dos likes nos tweets via WebSocket.<br>
O projeto é voltado para adaptação da aplicação da Semana Omnistack 5.0 da Rocketseat e estudo das funcionalidades de React Function Components e React Hooks (useState e useEffect).

<br><br>

## :rocket: Tecnologias
<ul>
  <li>Components</li>
  <li>Routes</li>
  <li>react-router-dom</li>
  <li>Services API</li>
  <li>Axios</li>
  <li>localStorage</li>
  <li>useState</li>
  <li>useEffect</li>
  <li>socket.io-client Websocket</li>
  <li>favicon.ico</li>
  <li>Styles CSS</li>
  <li>Fonts</li>
</ul>

<br><br>

## :arrow_forward: Start
<ul>
  <li>npm install</li>
  <li>npm run start / npm start</li>
</ul>

<br><br><br>

## :mega: Segue abaixo as principais estruturas e interfaces:

<br><br><br>

## src/App.js
```js
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Timeline from './pages/Timeline';

export default function App() {
  return(
    <BrowserRouter>
      <Switch>
        {/* Rota inicial de Login */}
        <Route path="/" exact component={ Login } />
        <Route path="/timeline" component={ Timeline } />
      </Switch>
    </BrowserRouter>
  );
};
```


<br><br>


## src/components/Tweet.js
```js
import React from 'react';

import like from '../like.svg';
import './Tweet.css';
import api from '../services/api';

export default function Tweet(props) {
  async function handleLike() {
    const { _id } = props.tweet;

    await api.post(`likes/${_id}`);
  }

  const { tweet } = props

  return(
    <li className="tweet">
      <strong>{ tweet.author }</strong>
      <p>{ tweet.content }</p>
      <button type="button" onClick={ handleLike }>
        <img src={ like } alt="Like" />
        { tweet.likes }
      </button>
    </li>
  )
};
```


<br><br>


## src/pages/Login.js
```js
import React, { useState } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

// history prop
function Login({ history }) {
  const [twitter_username, setTwitterUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!twitter_username.length) return;

    localStorage.setItem('@GoTwitter:twitter_username', twitter_username);

    // Navegação para Timeline
    history.push('/timeline');
  };

  return (
    <div className="login-wrapper">
      <img src={ twitterLogo } alt="GoTwitter" />
      <form onSubmit={ handleSubmit }>
        <input
          value={ twitter_username }
          onChange={e => setTwitterUsername(e.target.value)}
          placeholder="Nome de usuário"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
```


<br><br>
## Interface inicial

![00](https://user-images.githubusercontent.com/48495838/76800598-c5e23f80-67b2-11ea-817b-0126687ce564.PNG)

<br><br>

### Usuário logando com o seu username

![01](https://user-images.githubusercontent.com/48495838/76801247-05f5f200-67b4-11ea-8daa-c0904c335d25.PNG)

<br><br><br>


## src/pages/Timeline.js
```js
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
```


<br><br>

## Interface após o usuário efetuar login e ser redirecionado para a Timeline

![02](https://user-images.githubusercontent.com/48495838/76801250-07271f00-67b4-11ea-8ac0-1e795e276a79.png)

<br><br><br>

## Usuário enviando um novo tweet

![03](https://user-images.githubusercontent.com/48495838/76801253-07bfb580-67b4-11ea-88e0-e2c2f36b8d02.PNG)

<br><br><br>

### Interface após o usuário enviar o tweet

<br>

![04](https://user-images.githubusercontent.com/48495838/76801255-08584c00-67b4-11ea-9605-bf8af451be8a.PNG)

<br><br><br>

## Interface após o usuário dar like no novo tweet

<br>

![05](https://user-images.githubusercontent.com/48495838/76801258-08f0e280-67b4-11ea-951b-986674aee015.PNG)
