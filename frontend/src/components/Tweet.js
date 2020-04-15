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
