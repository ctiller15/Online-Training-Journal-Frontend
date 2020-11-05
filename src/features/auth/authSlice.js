import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkUserAuthentication } from '../../app/api/signupApi';

export const initialState = {
	isAuthenticated: false,
	loading: 'idle',
}

export const checkAuthentication = createAsyncThunk('auth/checkAuthentication', async () => {
	const response = await checkUserAuthentication();
	return response.data;
});

export const authSlice = createSlice({
  	name: 'auth',
	initialState,
  	reducers: {
		setAuthentication: (state, action) => {
			state.isAuthenticated = action.payload;
	  },
	},
	extraReducers: {
		[checkAuthentication.fulfilled]: (state, action) => {
			state.isAuthenticated = action.payload.authenticated
		}
	}
});

export const { setAuthentication } = authSlice.actions;

export const isAuthenticated = state => state.auth.isAuthenticated;

export default authSlice.reducer;
