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

test('Upon loading page, gets all existing pets for a user.', async () => {
	const pets = [
		{
			name: "Stanley"
		}, 
		{
			name: "Forest"
		}, 
		{
			name: "Alana"
		}];

	mockAxios.get.mockImplementationOnce(() => {
		return Promise.resolve({data: pets });
	})

	const { findAllByTestId } = render(
		<Provider store={store}>
			<MemoryRouter
				initialEntries={['/dashboard']}
				initialIndex={1}
			>
				<Dashboard />
			</MemoryRouter>
		</Provider>
	);

	const dashPet = await findAllByTestId('pet')

	expect(dashPet).toHaveLength(pets.length);
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

	fireEvent.click(getByRole('button', {name: /add new pet/i}));

	const nameInput = getByLabelText(/Name/i);
	nameInput.focus();

	fireEvent.change(nameInput, { target: { value:name } });

	fireEvent.click(getByRole('button', {name: /Save new pet/i}));

	const dashPet = await findAllByTestId('pet')

	expect(dashPet).toHaveLength(1);
})

test('After clicking a pet, displays that pet\'s information', async () => {
	const name = "Stanley";

	mockAxios.get.mockImplementationOnce(() => {
		return Promise.resolve({data: [ {name}, { name: "Alana"}] });
	})

	mockAxios.get.mockImplementationOnce(() => {
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

	const dashPet = await findAllByTestId('pet')

	fireEvent.click(dashPet[0]);

	expect(getByText(name)).toBeInTheDocument();
});


test('Updating a pet updates the dashboard', async () => {
	// Dev note, this only tests to the point where the reducer is sent. May need to be moved up and check the dashboard after.
	const names = [{id: 1, name: "stanley"}, {id: 2, name: "alana"}]
	const updatedName = "dummyName"

	mockAxios.get.mockImplementationOnce(() => {
		return Promise.resolve({data: names });
	})

	mockAxios.get.mockImplementationOnce(() => {
		return Promise.resolve({data: { name: names[0].name} });
	})

	mockAxios.put.mockImplementationOnce(() => {
		return Promise.resolve({ data: { id: 1, name: updatedName }});
	});

	const { getByRole, getByLabelText, findAllByTestId, getByText, findByText } = render(
		<Provider store={store}>
			<MemoryRouter
				initialEntries={['/dashboard']}
				initialIndex={1}
			>
				<Dashboard />
			</MemoryRouter>
		</Provider>
	);

	const dashPet = await findAllByTestId('pet')

	fireEvent.click(dashPet[0]);

	const editButton = getByRole('button', { name: /Edit/i });

	fireEvent.click(editButton);

	fireEvent.change(getByRole('textbox', 'pet-name'), {target: { value: updatedName }});

	fireEvent.click(getByRole('button', { name: /Save/i }));

	expect(mockAxios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/user/profile/pets/1`, {id: "1", name: updatedName});
});
