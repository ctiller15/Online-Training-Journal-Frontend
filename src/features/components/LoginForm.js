import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { TextField, FormControl, Button, Box } from '@material-ui/core';
import { login } from '../../app/api/signupApi'

export const LoginForm = (props) => {
	let history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [messageText, setMessageText] = useState("");

	const onEmailChange = (e) => setEmail(e.target.value);
	const onPasswordChange = (e) => setPassword(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			email,
			password
		}

		const response = await login(payload);
		if(response instanceof Error){
			setMessageText(response.message);
		} else {
			setMessageText(response.message);
			props.setAuthenticated(true);
			// Redirect to dashboard page if successful.
			setTimeout(() => {
				history.push('/dashboard');
			}, 1000);
		}
	}

	return (
		<Box
			component="form"
			aria-label="loginform"
			display="flex"
			flexDirection="column"
			onSubmit={handleSubmit}
		>
			<span>{messageText}</span>
			<FormControl>
				<TextField 
					onChange={onEmailChange}
					variant="outlined"
					id="email"
					label="email"
					value={email}
				/>
			</FormControl>
			<FormControl>
				<TextField 
					onChange={onPasswordChange}
					variant="outlined"
					id="password"
					label="password"
					type="password"
					value={password}
				/>
			</FormControl>
			<Button
				type="submit"
				disabled={!(email && password)}
				variant="contained"
				color="primary"
			>
				Log In
			</Button>
		</Box>
	)	
}
