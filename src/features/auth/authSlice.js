import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkUserAuthentication, sendLogoutRequest } from '../../app/api/signupApi';

export const initialState = {
	isAuthenticated: false,
	loading: 'idle',
}

export const checkAuthentication = createAsyncThunk('auth/checkAuthentication', async () => {
	const response = await checkUserAuthentication();
	return response.data;
});

export const logUserOut = createAsyncThunk('auth/logUserOut', async () => {
	const response = await sendLogoutRequest();
	return response;
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
		},
		[logUserOut.fulfilled]: (state, action) => {
			state.isAuthenticated = false
		}
	}
});

export const { setAuthentication } = authSlice.actions;

export const isAuthenticated = state => state.auth.isAuthenticated;

export default authSlice.reducer;
