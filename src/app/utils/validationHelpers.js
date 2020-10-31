export const emailValidator = (email) => {
	// Base regex taken from https://www.w3resource.com/javascript/form/email-validation.php
	// Should be good enough for the majority of cases. We can test for the remainder of edge cases we run into.
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	return emailRegex.test(email);
}
