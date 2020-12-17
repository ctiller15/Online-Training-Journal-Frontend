import { saveNewPet, getCurrentUserPets, updatePetById } from '../../app/api/dashboardApi';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
	pets: [],
	loading: 'idle',
}

export const updatePet = createAsyncThunk('pets/updatePet', async(body) => {
	const response = await updatePetById(body);
	return response.data;
});

export const savePet = createAsyncThunk('pets/savePet', async (body) => {
	const response = await saveNewPet(body);
	return response.data;
});

export const getLoggedInPets = createAsyncThunk('pets/getCurrentUserPets', async () => {
	const response = await getCurrentUserPets();
	return response.data;
});

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
	},

	extraReducers: {
		[savePet.fulfilled]: (state, action) => {
			state.pets.push(action.payload);
		},
		[getLoggedInPets.fulfilled]: (state, action) => {
			state.pets = action.payload;
		},
		[updatePet.fulfilled]: (state, action) => {
			const updatedPetIndex = state.pets.findIndex(f => f.id === action.payload.id);

			state.pets.splice(updatedPetIndex, 1, action.payload);
		},
	}
});

export const petsList = state => state.dashboard.pets;

export default dashboardSlice.reducer;
