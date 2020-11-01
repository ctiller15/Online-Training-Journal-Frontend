import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import { SignupForm } from './features/components/SignupForm';

function App() {
  return (
    <div className="App">
		<Link to="/">Home</Link>
		<Link to="/signup">Sign Up</Link>
		<Link to="/login">Log In</Link>
		<Switch>
			<Route exact path="/">
				<h1>Home</h1>
			</Route>
			<Route exact path="/signup">
				<SignupForm />
			</Route>
			<Route exact path="/login">
				<h1>Log In Form?</h1>
			</Route>
			<Route exact path="/dashboard">
				<h1>Dashboard</h1>
			</Route>
			<Redirect to="/" />
		</Switch>
    </div>
  );
}

export default App;
