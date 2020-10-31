import {emailValidator } from '../../../app/utils/validationHelpers'

describe.each`
	email							| result
	${'example@example.com'}		| ${true}
	${'example'}					| ${false}
	${'example.com'}				| ${false}
	${'example@'}					| ${false}
	${'anotheremail123@yahoo.com'}	| ${true}
	${'info@canineLingo.com'}		| ${true}
	${'dog_lover-123@dogLovers.biz'}| ${true}
`('email validation', ({email, result}) => {
	test('it correctly validates emails', () => {
		expect(emailValidator(email)).toBe(result);
	})
});
