import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';

function App() {

  return (
    <Router>
      <div className="App">
       
        <div id="page-body">
        <Switch>
              <Route path="/" exact component={Home} />
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
