import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { Dashboard } from '../../features/dashboard/Dashboard'
import { MemoryRouter } from 'react-router-dom';

test('Page renders a button that allows the user to add a new pet.', () => {
	const { getByRole } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Dashboard />
			</MemoryRouter>
		</Provider>
	);

	expect(getByRole('button', /add pet/i)).toBeInTheDocument();
})

test('Upon clicking the add new pet button, new pet form displays.', () => {
	const { getByText, getByRole } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Dashboard />
			</MemoryRouter>
		</Provider>
	);

	fireEvent.click(getByRole('button', /add new pet/i));

	expect(getByText(/add new pet form/i)).toBeInTheDocument()
})
