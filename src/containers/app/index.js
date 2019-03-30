import React, { Component } from 'react';
import './app.css';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import {ABOUT_US, HOME, ROOT} from '../../routes';
import {Home} from '../home';
import {AboutUs} from '../aboutUs';

export class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <Link to={HOME.url()}>Home</Link>
          <Link to={ABOUT_US.url()}>About us</Link>
        </header>
        <Switch>
          <Route
            path={HOME.url()}
            component={Home}
          />
          <Route
            component={AboutUs}
            path={ABOUT_US.url()}
          />
          <Redirect from={ROOT.url()} to={HOME.url()}/>
        </Switch>
      </div>
    );
  }
}
