import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { AddNewPetForm } from '../../features/components/AddNewPetForm';

test('The add new pet form renders', () => {
	const { getByRole } = render(
		<AddNewPetForm />
	);

	const addNewPetForm = getByRole('form', {name: /addNewPetForm/i});
	expect(addNewPetForm).toBeInTheDocument();
})

test('If name is empty, submit button is disabled', () => {
	const { getByRole } = render(
		<AddNewPetForm />
	);

	const submitButton = getByRole('button', /Add new Pet/i);
	expect(submitButton).toBeDisabled();
});

test('If name exists, submit button is enabled', () => {
	const name = "Stanley";

	const { getByRole, getByLabelText } = render(
		<AddNewPetForm />
	);

	const nameInput = getByLabelText(/Name/i);
	nameInput.focus();

	fireEvent.change(nameInput, { target: { value: name} });

	const submitButton = getByRole('button', /Add new pet/i);
	expect(submitButton).not.toBeDisabled();
})
