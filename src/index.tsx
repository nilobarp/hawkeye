import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import { Auth } from './helper/auth';

import { Home } from './pages/Home';
import { Stories } from './pages/Stories';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Editor } from './pages/Editor';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/console" component={Stories} onEnter={Auth.check}/>
    <Route path="/console/signup" component={Signup}/>
    <Route path="/console/login" component={Login}/>
    <Route path="/console/editor" component={Editor} onEnter={Auth.check}/>
  </Router>,
  document.getElementById('app')
);