import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import { Auth } from './helper/auth';

import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Editor } from './pages/Editor';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home} onEnter={Auth.check}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/login" component={Login}/>
    <Route path="/editor" component={Editor} onEnter={Auth.check}/>
  </Router>,
  document.getElementById('app')
);