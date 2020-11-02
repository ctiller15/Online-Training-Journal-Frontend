import React from 'react';
import axios from 'axios';

import { render, fireEvent } from '@testing-library/react';
import { LoginForm } from '../../../src/features/components/LoginForm';

jest.mock('axios');

test('Login form component renders', () => {
	const { getByRole } = render(
		<LoginForm />
	);

	const loginForm = getByRole('form', { name: /loginform/i});
	expect(loginForm).toBeInTheDocument();
})

test('log in button is disabled by default.', () => {
	const { getByRole } = render(
		<LoginForm />
	);

	const loginButton = getByRole('button', /Log In/i);
	expect(loginButton).toBeDisabled();
})

test('if all fields are filled in and validated, Log In button is no longer disabled.', () => {
	const email = "email@email.com"
	const password = "password"

	const { getByRole, getByLabelText } = render(
		<LoginForm />
	);

	const emailInput = getByLabelText(/Email/i);
	emailInput.focus()
	fireEvent.change(emailInput, { target: {value: email} })

	const passwordInput = getByLabelText('password', {exact: true});
	passwordInput.focus()
	fireEvent.change(passwordInput, { target: {value: password}})

	const loginButton = getByRole('button', /Log In/i);
	expect(loginButton).not.toBeDisabled();
})

test('after submitting, if the validation fails, user is prompted with a message that their username/password combination is incorrect.', async () => {
	const errorMessage = 'Incorrect email/password combination';
	
	axios.post.mockImplementationOnce(() => {
		return Promise.reject(new Error(errorMessage));
	})

	const email = "email@email.com"
	const password = "password"

	const { getByRole, getByLabelText, findByText } = render(
		<LoginForm />
	);

	const emailInput = getByLabelText(/Email/i);
	fireEvent.change(emailInput, { target: {value: email} })

	const passwordInput = getByLabelText('password', {exact: true});
	fireEvent.change(passwordInput, { target: {value: password}})

	const signupButton = getByRole('button', /Log In/i);
	fireEvent.click(signupButton);
	
	expect(await findByText(errorMessage)).toBeInTheDocument();
});


