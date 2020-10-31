import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SignupForm } from '../../features/components/SignupForm';

test('Signup form component renders', () => {
	const { getByRole } = render(
		<SignupForm />
	);

	const signUpForm = getByRole('form', {name: /signupform/i});
	expect(signUpForm).toBeInTheDocument();
})

test('if email is not valid, displays validation error', () => {
	const fakeEmail = "email"

	const { getByLabelText, getByText } = render(
		<SignupForm />
	);

	const emailInput = getByLabelText(/Email/i);

	emailInput.focus()
	fireEvent.change(emailInput, { target: {value: fakeEmail} })
	emailInput.blur()

	expect(getByText(/Not a valid email address/i)).toBeInTheDocument();
});

test('if passwords do match, form gives user affirmation that passwords are correct.', () => {
	const dummyEmail = "example@example.com"
	const passwordSubmit = "password"

	const { getByLabelText, getByText } = render(
		<SignupForm />
	);

	const emailInput = getByLabelText(/Email/i);
	emailInput.focus()
	fireEvent.change(emailInput, { target: {value: dummyEmail} })

	const passwordInput = getByLabelText(/Password/i);
	passwordInput.focus()
	fireEvent.change(passwordInput, { target: {value: passwordSubmit}})

	const confirmPasswordInput = getByLabelText(/Confirm Password/i);
	confirmPasswordInput.focus()
	fireEvent.change(confirmPasswordInput, { target: {value: passwordSubmit }})

	expect(getByText(/passwords match/i)).toBeInTheDocument();
	throw new Error('Finish the test!');
})

test('if passwords do not match, form warns user that passwords do not match.', () => {
	throw new Error('Finish the test!');
})

test('if all fields are filled in and validated, sign up button is no longer disabled.', () => {
	throw new Error('Finish the test!');
})

test('after submitting, if the email is duplicated, user is told that a user with that email already exists.', () => {
	throw new Error('Finish the test!');
});

test('after submitting, if a generic error occurs, user is prompted above the sign up form.', () => {
	throw new Error('Finish the test!');
})
