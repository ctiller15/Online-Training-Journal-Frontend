import { configureStore } from '@reduxjs/toolkit'
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Dashboard } from '../../features/dashboard/Dashboard'
import { MemoryRouter } from 'react-router-dom';
import mockAxios from 'axios'

import authReducer from '../../features/auth/authSlice';
import dashboardReducer from '../../features/dashboard/dashboardSlice';

let store;

beforeEach(() => {
	store = configureStore({
		reducer: {
			auth: authReducer,
			dashboard: dashboardReducer,
		}
	});
});

test('Page renders a button that allows the user to add a new pet.', () => {
	const { getByRole } = render(
		<Provider store={store}>
			<MemoryRouter
				initialEntries={['/dashboard']}
				initialIndex={1}
			>
				<Dashboard />
			</MemoryRouter>
		</Provider>
	);

	expect(getByRole('button', /add pet/i)).toBeInTheDocument();
})

test('Upon clicking the add new pet button, new pet form displays.', () => {
	const { getByRole } = render(
		<Provider store={store}>
			<MemoryRouter
				initialEntries={['/dashboard']}
				initialIndex={1}
			>
				<Dashboard />
			</MemoryRouter>
		</Provider>
	);

	fireEvent.click(getByRole('button', /add new pet/i));

	expect(getByRole('form', {name: /addnewpetform/i})).toBeInTheDocument()
})

test('After submiting the add new pet form, a new pet displays on the dashboard', async () => {
	const name = "Stanley";

	mockAxios.post.mockImplementationOnce(() => {
		return Promise.resolve({data: {name} });
	})

	const { getByRole, getByLabelText, findAllByTestId } = render(
		<Provider store={store}>
			<MemoryRouter
				initialEntries={['/dashboard']}
				initialIndex={1}
			>
				<Dashboard />
			</MemoryRouter>
		</Provider>
	);

	fireEvent.click(getByRole('button', /add new pet/i));

	const nameInput = getByLabelText(/Name/i);
	nameInput.focus();

	fireEvent.change(nameInput, { target: { value:name } });

	fireEvent.click(getByRole('button', /Add new pet/i));

	const dashPet = await findAllByTestId('pet')

	expect(dashPet).toHaveLength(1);
})

test('After clicking a pet, displays that pet\'s information', async () => {
	const name = "Stanley";

	mockAxios.post.mockImplementationOnce(() => {
		return Promise.resolve({data: {name} });
	})

	const { getByRole, getByLabelText, findAllByTestId, getByText } = render(
		<Provider store={store}>
			<MemoryRouter
				initialEntries={['/dashboard']}
				initialIndex={1}
			>
				<Dashboard />
			</MemoryRouter>
		</Provider>
	);

	fireEvent.click(getByRole('button', /add new pet/i));

	const nameInput = getByLabelText(/Name/i);
	nameInput.focus();

	fireEvent.change(nameInput, { target: { value:name } });

	fireEvent.click(getByRole('button', /Add new pet/i));

	const dashPet = await findAllByTestId('pet')

	fireEvent.click(dashPet[0]);

	expect(getByText(name)).toBeInTheDocument();

	throw new Error('Finish the test!');
})

