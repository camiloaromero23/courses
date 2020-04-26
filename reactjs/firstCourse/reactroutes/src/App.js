import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Contact from "./pages/Contact"
import AboutMe from "./pages/AboutMe"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
        <Link to="./">
            <button >Home</button>
          </Link>
          <Link to="./Contact">
            <button >Contact</button>
          </Link>
          <Link to="./AboutMe">
            <button >About me</button>
          </Link>

        </div>
        <Switch>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/AboutMe">
            <AboutMe />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
