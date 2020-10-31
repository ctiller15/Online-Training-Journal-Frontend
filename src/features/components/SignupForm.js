import React, { useState } from 'react';
import { TextField, FormControl } from '@material-ui/core'
import { emailValidator } from '../../app/utils/validationHelpers'

export const SignupForm = (props) => {
	const [invalidEmail, setInvalidEmail] = useState(false)
	const [email, setEmail] = useState("")

	const generateEmailHelperText = () => {
		if(invalidEmail){
			return email.length === 0 ? "Please enter an email" : "Not a valid email address"
		} else {
			return "";
		}
	}

	const validateEmail = () => {
		setInvalidEmail(email.length === 0 || !emailValidator(email))
	}

	const onEmailChange = (event) => {
		setEmail(event.target.value);
	}

	return (
		<form aria-label="signupform">
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
			<label>
				Password
				<input type="password" name="password" />
			</label>
			<label>
				Confirm Password
				<input type="password" name="passwordconfirm" />
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
}
