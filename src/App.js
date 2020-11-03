import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import { SignupForm } from './features/components/SignupForm';
import { LoginForm } from './features/components/LoginForm';
import { Dashboard } from './features/dashboard/Dashboard';

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
				<LoginForm />
			</Route>
			<Route path="/dashboard">
				<Dashboard />
			</Route>
			<Redirect to="/" />
		</Switch>
    </div>
  );
}

export default App;
