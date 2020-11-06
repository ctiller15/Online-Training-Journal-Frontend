import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import { isAuthenticated, checkAuthentication, setAuthentication } from './features/auth/authSlice';

import { SignupForm } from './features/components/SignupForm';
import { LoginForm } from './features/components/LoginForm';
import { Dashboard } from './features/dashboard/Dashboard';

function App() {
	const isUserAuthenticated = useSelector(isAuthenticated);

	const dispatch = useDispatch();

	const setAuthenticated = (bool) => dispatch(setAuthentication(bool));

	const userAuthLinks = () => {
		if(isUserAuthenticated){
			return (
				<React.Fragment>
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/logout">Log Out</Link>
				</React.Fragment>
			)
		} else {
			return (
				<React.Fragment>
					<Link to="/signup">Sign Up</Link>
					<Link to="/login">Log In</Link>
				</React.Fragment>
			)
		}
	}

	useEffect(() => {
		dispatch(checkAuthentication())
	}, [])

  return (
    <div className="App">
		<Link to="/">Home</Link>
		{userAuthLinks()}
		<Switch>
			<Route exact path="/">
				<h1>Home</h1>
			</Route>
			<Route exact path="/signup">
				<SignupForm />
			</Route>
			<Route exact path="/login">
				<LoginForm setAuthenticated={setAuthenticated}/>
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
