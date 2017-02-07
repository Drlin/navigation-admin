import React from 'react';
import { Router, Route, Link } from 'dva/router';
import Users from './routes/Users';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Users} />
    </Router>
  );
}
