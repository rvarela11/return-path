import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './components/app';
import Home from './components/home';

export default (
    <Route path="/" component={App} >
      <IndexRoute name="index" component={Home} />
    </Route>
);
