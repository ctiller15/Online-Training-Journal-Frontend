import { instance } from './axiosConfig';

export const getCurrentUserPets = async () => {
	const url = `${process.env.REACT_APP_API_URL}/user/profile/pets`;

	const response = await instance.get(url);
	return response;
}

export const saveNewPet = async (payload) => {
	const url = `${process.env.REACT_APP_API_URL}/user/profile/pets/new`;

	const response = await instance.post(url, payload);
	return response;
}

export const updatePetById = async(payload) => {
	const url = `${process.env.REACT_APP_API_URL}/user/profile/pets/${payload.id}`;

	const response = await instance.put(url, payload);
	return response;
}
