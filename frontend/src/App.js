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
