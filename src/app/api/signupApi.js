import axios from 'axios';
import { instance } from './axiosConfig';

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
		response = await instance.post(url, payload);
	} catch (err) {
		response = err;
	}

	return response
}

export const sendLogoutRequest = async () => {
	const url = `${process.env.REACT_APP_API_URL}/logout`;

	const response = await instance.post(url, {});

	return response;
}

export const checkUserAuthentication = async () => {
	const url = `${process.env.REACT_APP_API_URL}/user/checkAuthentication`;

	let response;

	try {
		response = await instance.get(url);
	} catch (err) {
		response = Promise.resolve({data: {}})
	}

	return response
}
