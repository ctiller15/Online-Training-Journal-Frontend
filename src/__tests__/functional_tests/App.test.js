import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import App from '../../App';
import { MemoryRouter } from 'react-router-dom';

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
	const testEmail = "example@example.com";
	const testPassword = "password";

	const { getByLabelText, findByText } = render(
		<Provider store={store}>
			<MemoryRouter
				initialEntries={['/signup']}
				initialIndex={1}
			>
				<App />
			</MemoryRouter>
		</Provider>
	);

	const emailInput = getByLabelText('Email');
	const passwordInput = getByLabelText('Password');
	const passwordConfirm = getByLabelText('Confirm Password');

	fireEvent.change(emailInput, { target: { value: testEmail} })
	fireEvent.change(passwordInput, { target: { value: testPassword } })
	fireEvent.change(passwordConfirm, { target: {value: testPassword } });

	// Wait on mock server call.

	const dashboard = await findByText(/Dashboard/i);
	expect(dashboard).toBeInTheDocument();

	throw new Error('finish the test!');
});
