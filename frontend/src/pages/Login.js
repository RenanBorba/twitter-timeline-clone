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
