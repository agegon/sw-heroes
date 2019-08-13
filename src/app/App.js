import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import HeroesList from './components/HeroesList';

export default function App() {
  return (
    <Router basename={__webpack_public_path__ || '/'}>
      <header className='header'>
        <h1 className='header__title'>Star Wars heroes!</h1>
      </header>
      <div className='layout-wrap'>
        <aside>
          <Route path={['/people/:id', '/']} component={HeroesList} />
        </aside>
        <Switch>
          <Route path='/people/:id' component={hello} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
}

const hello = props => (<h1>Hello {props.match.params.id}!</h1>);
