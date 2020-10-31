import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SignupForm } from '../../features/components/SignupForm';

test('Signup form component renders', () => {
	const { getByRole } = render(
		<SignupForm />
	);

	const signUpForm = getByRole('form', {name: /signupform/i});
	expect(signUpForm).toBeInTheDocument();
})

test('if email is not valid, displays validation error', () => {
	


	throw new Error('Finish the test!');
});

test('if passwords do match, form gives user affirmation that passwords are correct.', () => {
	throw new Error('Finish the test!');
})

test('if passwords do not match, form warns user that passwords do not match.', () => {
	throw new Error('Finish the test!');
})

test('if all fields are filled in and validated, sign up button is no longer disabled.', () => {
	throw new Error('Finish the test!');
})

test('after submitting, if the email is duplicated, user is told that a user with that email already exists.', () => {
	throw new Error('Finish the test!');
});

test('after submitting, if a generic error occurs, user is prompted above the sign up form.', () => {
	throw new Error('Finish the test!');
})
