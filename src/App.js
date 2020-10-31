import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Link, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
		<Link to="/signup">Sign Up</Link>
		<Link to="/login">Log In</Link>
		<Switch>
		</Switch>
    </div>
  );
}

export default App;
