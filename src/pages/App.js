import React from "react";

import style from "../App.module.css";
import Login from "../component/Login";
import Create from "../component/Create";
import Dashboard from "../component/Dashboard";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className={style.main}>
      <div className={style.mainbackground} />
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/cadastro" component={Create} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
