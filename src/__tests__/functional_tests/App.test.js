import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../../App';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../../features/auth/authSlice'
import mockAxios from 'axios'

let store;

beforeEach(() => {
	store = configureStore({
		reducer: {
			auth: authReducer
		}
	});
});

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

test('if user is logged in, renders dashboard and log out links', async () => {
	mockAxios.get.mockImplementationOnce(() => {
		return Promise.resolve({data: {authenticated: true}})
	})

	const { findByRole } = render(
		<Provider store={store}>
			<MemoryRouter>
				<App />
			</MemoryRouter>
		</Provider>
	);

	const dashboardLink = await findByRole('link', {name: /dashboard/i});
	expect(dashboardLink).toBeInTheDocument();

	const logoutLink = await findByRole('link', {name: /Log Out/i});
	expect(logoutLink).toBeInTheDocument();
})

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

	mockAxios.post.mockImplementationOnce(() => {
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

test('upon clicking log in, redirects to login page.', () => {
	const { getByRole } = render(
		<Provider store={store}>
			<MemoryRouter>
				<App />
			</MemoryRouter>
		</Provider>
	);

	const loginLink = getByRole('link', {name: /Log In/i});

	fireEvent.click(loginLink);

	const loginForm = getByRole('form', {name: /loginform/i});
	expect(loginForm).toBeInTheDocument();
});

test('after logging in successfully, users are redirected to their dashboard', async () => {
	const response = {
		message: "Logged In"
	}

	mockAxios.post.mockImplementationOnce(() => {
		return Promise.resolve(response);
	})

	const testEmail = "example@example.com";
	const testPassword = "password";

	const { getByLabelText, findByText, getByRole, findByRole } = render(
		<Provider store={store}>
			<MemoryRouter
				initialEntries={['/login']}
				initialIndex={1}
			>
				<App />
			</MemoryRouter>
		</Provider>
	);

	const emailInput = getByLabelText(/Email/i);
	const passwordInput = getByLabelText('password');

	fireEvent.change(emailInput, { target: { value: testEmail} })
	fireEvent.change(passwordInput, { target: { value: testPassword } })

	const signupButton = getByRole('button', /Log In/i);
	fireEvent.click(signupButton);

	expect(await findByText(response.message)).toBeInTheDocument();

	const dashboard = await findByText(/Dashboard/i);
	expect(dashboard).toBeInTheDocument();

	const dashboardLink = await findByRole('link', {name: /dashboard/i});
	expect(dashboardLink).toBeInTheDocument();

	const logoutLink = await findByRole('link', {name: /Log Out/i});
	expect(logoutLink).toBeInTheDocument();
});

