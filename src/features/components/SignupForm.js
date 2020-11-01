import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { TextField, FormControl, Button, Box } from '@material-ui/core'
import { emailValidator } from '../../app/utils/validationHelpers'
import { signUp } from '../../app/api/signupApi'

export const SignupForm = (props) => {
	let history = useHistory();

	const [messageText, setMessageText] = useState("")
	const [emailFieldActivated, setEmailFieldActivated] = useState(false)
	const [passwordConfirmationActivated, setPasswordConfirmationActivated] = useState(false)
	const [passwordsMatch, setPasswordsMatch] = useState(false)
	const [invalidEmail, setInvalidEmail] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConf, setPasswordConf] = useState("")

	useEffect(() => {
		validatePasswordMatch()
	});

	const generateEmailHelperText = () => {
		if(emailFieldActivated && invalidEmail){
			return email.length === 0 ? "Please enter an email" : "Not a valid email address"
		} else {
			return "";
		}
	}

	const validateEmail = () => {
		setInvalidEmail(emailFieldActivated && (email.length === 0 || !emailValidator(email)))
	}

	const onEmailChange = (event) => {
		if(!emailFieldActivated){
			setEmailFieldActivated(true)
		}
		setEmail(event.target.value);
	}

	const onPasswordChange = (event) => {
		setPassword(event.target.value);
	}

	const validatePasswordMatch = () => {
		setPasswordsMatch(password === passwordConf);
	}

	const generatePasswordConfirmHelperText = () => {
		if(!passwordConfirmationActivated){
			return ""
		}
		return passwordsMatch ? "passwords match" : "passwords do not match"
	}

	const handlePasswordConfChange = (e) => {
		if(!passwordConfirmationActivated){
			setPasswordConfirmationActivated(true)
		}
		setPasswordConf(e.target.value)
	}

	const allFieldsSubmitted = () => {
		return emailFieldActivated 
			&& passwordConfirmationActivated 
			&& !invalidEmail 
			&& passwordsMatch
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			email,
			password
		}
		
		const response = await signUp(payload);
		if(response instanceof Error){
			setMessageText(response.message);
		} else {
			setMessageText(response.message);
			// Redirect to dashboard page if successful.
			setTimeout(() => {
				history.push('/dashboard');
			}, 1000)
		}
	}

	return (
		<React.Fragment>
		<Box 
			component='form' 
			aria-label="signupform"
			display="flex"
			flexDirection="column"
			onSubmit={handleSubmit}>
			<span>{messageText}</span>
			<FormControl>
				<TextField 
					error={invalidEmail}
					onChange={onEmailChange}
					onBlur={() => validateEmail()}
					value={email}
					variant="outlined"
					id="email"
					label="email"
					helperText={generateEmailHelperText()}
				/>
			</FormControl>
			<FormControl>
				<TextField 
					onChange={onPasswordChange}
					onBlur={() => validatePasswordMatch()}
					variant="outlined"
					id="password"
					label="password"
					type="password"
					value={password}
				/>
			</FormControl>
			<FormControl>
				<TextField 
					error={passwordConfirmationActivated && !passwordsMatch}
					onChange={handlePasswordConfChange}
					onBlur={() => validatePasswordMatch()}
					variant="outlined"
					id="passwordconfirm"
					label="confirm password"
					value={passwordConf}
					type="password"
					helperText={generatePasswordConfirmHelperText()}
				/>
			</FormControl>

			<Button 
				type="submit" 
				value="Submit" 
				disabled={!allFieldsSubmitted()}
				variant="contained"
				color="primary"
			>Sign Up</Button>
		</Box>
		</React.Fragment>
	);
}
