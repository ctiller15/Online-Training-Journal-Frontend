import dashboardReducer, {
	initialState,
	saveNewPet
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
		const expectedAction = SaveNewPet.fulfilled(mockPayload);

		expect(dashboardReducer({}, expectedAction).pets).toHaveLength(initialState.pets.length + 1);

		throw new Error('Finish the test!');
	})
});
