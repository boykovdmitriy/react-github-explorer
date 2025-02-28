import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import {ROOT, REPOSITORY_ISSUES} from '../../routes';
import {Issues} from '../issues';
import {SearchRepository} from '../searchRepository';
import './app.scss';


export class App extends Component {
  render() {
    return (
      <div className="app">
        <section className="app__container">
          <Switch>
            <Route
              path={ROOT.url()}
              exact
              component={SearchRepository}
            />
            <Route
              component={Issues}
              path={REPOSITORY_ISSUES.url()}
            />
          </Switch>
        </section>
      </div>
    );
  }
}
