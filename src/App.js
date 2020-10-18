import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import TonyHawkScreen from './screens/TonyHawk';
import BeatSaberScreen from './screens/BeatSaber';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/tony-hawk" component={TonyHawkScreen} />
    <Route exact path="/beat-saber" component={BeatSaberScreen} />
  </Switch>
);

export default App;
