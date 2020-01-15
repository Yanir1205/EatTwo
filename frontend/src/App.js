import React from 'react';
import { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from './pages/Home';
import MealApp from './pages/MealApp';
import MealDetails from './pages/MealDetails';
import UserDetails from './pages/UserDetails';
import MealForm from './pages/MealForm';

import Header from './components/Header';
import Footer from './components/Footer';

import './assets/styles/global.scss';

const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Header></Header>
          <Switch>
            <Route component={Home} path='/' exact></Route>
            <Route component={MealApp} path='/meal' exact></Route>
            <Route component={MealDetails} path='/meal/:id' exact></Route>
            <Route component={UserDetails} path='/user/:id' exact></Route>
            <Route component={MealForm} path='/meal/edit/:id'></Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </React.Fragment>
    );
  }
}