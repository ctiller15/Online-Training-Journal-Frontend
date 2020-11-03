import authReducer, {
	initialState,
	setAuthentication,
	checkAuthentication
} from '../../../features/auth/authSlice';

jest.mock('../../../app/api/signupApi');

describe('authSlice', () => {
	it('returns initial state', () => {
		const nextState = authReducer(undefined, {});
		expect(nextState).toBe(initialState);
	});

	it('sets the authentication based off the value passed in.', () => {
		const newAuth = true;
		const nextState = authReducer(initialState, setAuthentication(newAuth))

		expect(nextState.isAuthenticated).toBe(newAuth);
	});

	it('automatically updates user authentication values based on a response', () => {
		const mockPayload = {
			authenticated: true
		}
		const expectedAction = checkAuthentication.fulfilled(mockPayload);

		expect(authReducer({}, expectedAction).isAuthenticated).toEqual(mockPayload.authenticated);
	})
});
