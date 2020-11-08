import dashboardReducer, {
	initialState,
	savePet
} from '../../../features/dashboard/dashboardSlice';

jest.mock('../../../app/api/dashboardApi');

describe('dashboardSlice', () => {
	it('returns initial state', () => {
		const nextState = dashboardReducer(undefined, {});
		expect(nextState).toBe(initialState);
	});

	it('automatically updates the pets display if successful response', () => {
		const mockPayload = {
			data: {
				name: "Stanley"
			}
		}
		const expectedAction = savePet.fulfilled(mockPayload);

		expect(dashboardReducer(undefined, expectedAction).pets).toHaveLength(initialState.pets.length + 1);
	})
});
