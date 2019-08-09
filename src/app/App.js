import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import HeroesList from './components/HeroesList';

export default function App() {
  return (
    <Router>
      <h1>Star Wars heroes!</h1>
      <HeroesList />
        <Switch>
          <Route path='/people/:id' component={hello} />
          <Redirect to='/' />
        </Switch>
    </Router>
  );
}

const hello = props => (<h1>Hello {props.match.params.id}!</h1>);
