import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Welcome from './components/Welcome'

import "./App.css";

function App() {
  return (
    <Switch>
      <Route path="/" component={Welcome}/>
    </Switch>
  )
}

export default App;
