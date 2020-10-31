import React from 'react';

export const SignupForm = (props) => {
	return (
		<form aria-label="signupform">
			<label>
				Email
				<input type="email" name="email" />
			</label>
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
