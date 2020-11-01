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

test('form does not give email validation warning until form is used.', () => {
	const { queryByText } = render(
		<SignupForm />
	);

	expect(queryByText(/Please enter an email/)).toBeNull();
})

test('form does not give password validation warning until form is used.', () => {
	const { queryByText } = render(
		<SignupForm />
	);

	expect(queryByText(/passwords match/i)).not.toBeInTheDocument()
})

test('if passwords do match, form gives user affirmation that passwords are correct.', () => {
	const dummyEmail = "example@example.com"
	const passwordSubmit = "password"

	const { getByLabelText, getByText } = render(
		<SignupForm />
	);

	const emailInput = getByLabelText(/Email/i);
	emailInput.focus()
	fireEvent.change(emailInput, { target: {value: dummyEmail} })

	const passwordInput = getByLabelText('password', {exact: true});
	passwordInput.focus()
	fireEvent.change(passwordInput, { target: {value: passwordSubmit}})

	const confirmPasswordInput = getByLabelText(/Confirm Password/i);
	confirmPasswordInput.focus()
	fireEvent.change(confirmPasswordInput, { target: {value: passwordSubmit }})

	expect(getByText(/passwords match/i)).toBeInTheDocument();
})

test('if passwords do not match, form warns user that passwords do not match.', () => {
	const dummyEmail = "example@example.com"
	const passwordSubmit = "password"
	const incorrectPasswordSubmit = "incorrectPassword"

	const { getByLabelText, getByText } = render(
		<SignupForm />
	);

	const emailInput = getByLabelText(/Email/i);
	emailInput.focus()
	fireEvent.change(emailInput, { target: {value: dummyEmail} })

	const passwordInput = getByLabelText('password', {exact: true});
	passwordInput.focus()
	fireEvent.change(passwordInput, { target: {value: passwordSubmit}})

	const confirmPasswordInput = getByLabelText(/Confirm Password/i);
	confirmPasswordInput.focus()
	fireEvent.change(confirmPasswordInput, { target: {value: incorrectPasswordSubmit }})

	expect(getByText(/passwords do not match/i)).toBeInTheDocument();
})

test('sign up button is disabled by default.', () => {
	const { getByRole } = render(
		<SignupForm />
	);

	const signupButton = getByRole('button', /Sign Up/i);
	expect(signupButton).toBeDisabled();
})

test('if all fields are filled in and validated, sign up button is no longer disabled.', () => {
	const email = "email@email.com"
	const password = "password"

	const { getByRole, getByLabelText } = render(
		<SignupForm />
	);

	const emailInput = getByLabelText(/Email/i);
	emailInput.focus()
	fireEvent.change(emailInput, { target: {value: email} })

	const passwordInput = getByLabelText('password', {exact: true});
	passwordInput.focus()
	fireEvent.change(passwordInput, { target: {value: password}})

	const confirmPasswordInput = getByLabelText(/Confirm Password/i);
	confirmPasswordInput.focus()
	fireEvent.change(confirmPasswordInput, { target: {value: password}})

	const signupButton = getByRole('button', /Sign Up/i);
	expect(signupButton).not.toBeDisabled();
})

test('after submitting, if the email is duplicated, user is told that a user with that email already exists.', () => {
	throw new Error('Finish the test!');
});

test('after submitting, if a generic error occurs, user is prompted above the sign up form.', () => {
	throw new Error('Finish the test!');
})
