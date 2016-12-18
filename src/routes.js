import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import SearchLayout from './components/SearchLayout';
import PlayerLayout from './components/PlayerLayout';
import NotFound from './components/NotFound'

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={SearchLayout}/>
      <Route path="/video/:id" component={PlayerLayout} />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
)
