import { instance } from './axiosConfig';

export const saveNewPet = async (payload) => {
	const url = `${process.env.REACT_APP_API_URL}/user/profile/pets/new`;

	response = await instance.post(url, payload);
	return response;
}
