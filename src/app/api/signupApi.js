import axios from 'axios';

export const signUp = async (payload) => {
	const url = `${process.env.REACT_APP_API_URL}/signup`;

	let response;

	try {
		response = await axios.post(url, payload);
	} catch(err) {
		response = err;
	}

	return response;
}

export const login = async (payload) => {
	const url = `${process.env.REACT_APP_API_URL}/login`;

	let response;

	try {
		response = await axios.post(url, payload);
	} catch (err) {
		response = err;
	}

	return response
}
