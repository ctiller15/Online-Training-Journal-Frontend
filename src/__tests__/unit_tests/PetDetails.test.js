import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PetDetails } from '../../features/components/PetDetails';

test('It renders the component', () => {
	const { getByText, getByRole } = render(
		<PetDetails name="stanley" />
	);

	expect(getByText("stanley")).toBeInTheDocument();
	expect(getByRole("button", {name : /save/i})).toBeInTheDocument();
})

test('Toggling edit mode makes text editable', () => {
	const { getByRole } = render(
		<PetDetails name="stanley" />
	);

	const editButton = getByRole('button', {name : /edit/i });

	fireEvent.click(editButton);

	const nameEditField = getByRole('textbox', 'pet-name');

	expect(nameEditField).toBeInTheDocument();

	expect(nameEditField.value).toBe("stanley");
});

test('EditMode fields can be edited.', () => {
	const { getByRole } = render(
		<PetDetails name="stanley" />
	);

	const editButton = getByRole('button', {name : /edit/i });

	fireEvent.click(editButton);

	const nameEditField = getByRole('textbox', 'pet-name');
	
	fireEvent.change(nameEditField, { target: { value: 'Alana'} });

	expect(nameEditField.value).toBe('Alana');
});
