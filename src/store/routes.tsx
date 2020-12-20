import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import ListTask from '../pages/ListTask';
import FormTask from '../pages/FormTask';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/tasks" exact component={ListTask}></Route>
      <Route path="/tasks/create" exact component={FormTask}></Route>
      <Route path="/tasks/:id" exact component={FormTask}></Route>
    </Switch>
  );
}

export default Routes;
