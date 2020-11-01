import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import App from '../../App';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios'

jest.mock('axios');

test('renders Sign up and Log in links', () => {
	const { getByRole } = render(
		<Provider store={store}>
			<MemoryRouter>
				<App />
			</MemoryRouter>
		</Provider>
	);

	const signUpLink = getByRole('link', {name: /Sign Up/i});
	expect(signUpLink).toBeInTheDocument();

	const loginLink = getByRole('link', {name: /Log In/i});
	expect(loginLink).toBeInTheDocument();
});

test('upon clicking sign up, redirects to sign up page.', () => {
	const { getByRole } = render(
		<Provider store={store}>
			<MemoryRouter>
				<App />
			</MemoryRouter>
		</Provider>
	);

	const signUpLink = getByRole('link', {name: /Sign Up/i});

	fireEvent.click(signUpLink);

	const signUpForm = getByRole('form', {name: /signupform/i});
	expect(signUpForm).toBeInTheDocument();
});

test('after signing up successfully, users are redirected to their dashboard', async () => {
	const response = {
		message: "Account created successfully."
	}

	axios.post.mockImplementationOnce(() => {
		return Promise.resolve(response);
	})

	const testEmail = "example@example.com";
	const testPassword = "password";

	const { getByLabelText, findByText, getByRole } = render(
		<Provider store={store}>
			<MemoryRouter
				initialEntries={['/signup']}
				initialIndex={1}
			>
				<App />
			</MemoryRouter>
		</Provider>
	);

	const emailInput = getByLabelText(/Email/i);
	const passwordInput = getByLabelText('password');
	const passwordConfirm = getByLabelText(/Confirm Password/i);

	fireEvent.change(emailInput, { target: { value: testEmail} })
	fireEvent.change(passwordInput, { target: { value: testPassword } })
	fireEvent.change(passwordConfirm, { target: {value: testPassword } });

	const signupButton = getByRole('button', /Sign Up/i);
	fireEvent.click(signupButton);

	expect(await findByText(response.message)).toBeInTheDocument();

	const dashboard = await findByText(/Dashboard/i);
	expect(dashboard).toBeInTheDocument();
});
