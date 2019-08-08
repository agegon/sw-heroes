import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import HeroesList from './components/HeroesList';

export default class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/people/:id' component={HeroesList} />
          <Route path='/' exact component={HeroesList} />
          <Redirect to='/' />
        </Switch>
      </Router>
    );
  }
}