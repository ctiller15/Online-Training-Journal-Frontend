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

	const signUpForm = getByRole('form', {name: /Sign Up/i});
	expect(signUpForm).toBeInTheDocument();

	throw new Error('Finish the test!');	
});
