import React, { useState, useEffect } from 'react';
import { TextField, FormControl, Button } from '@material-ui/core'
import { emailValidator } from '../../app/utils/validationHelpers'

export const SignupForm = (props) => {

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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submitting the form!");
	}

	return (
		<form aria-label="signupform" onSubmit={handleSubmit}>
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
					helperText={generatePasswordConfirmHelperText()}
				/>
			</FormControl>

			<Button 
				type="submit" 
				value="Submit" 
				disabled={!allFieldsSubmitted()}
			>Sign Up</Button>
		</form>
	);
}
