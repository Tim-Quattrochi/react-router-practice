import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from './components/Welcome'

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}/>
    </Routes>
  )
}

export default App;
