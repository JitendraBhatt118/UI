import messages from '@shared/constants/login.constants.json'

export function resolveLoginFailureMessage(processResponse) {
	if (!processResponse) {
		return null
	}

	const messageKey = processResponse?.messageKey || processResponse?.MessageKey
	return (
		messages?.loginErrorMessages?.[messageKey] ||
		processResponse?.message ||
		processResponse?.Message ||
		null
	)
}

export function resolveLoginRequestErrorMessage(error) {
	const data = error?.data
	const messageKey = data?.messageKey ?? data?.MessageKey
	const inner = data?.data ?? data?.Data
	const processResponse = inner?.dataProcessResponse ?? inner?.DataProcessResponse

	return (
		messages?.loginErrorMessages?.[messageKey] ||
		resolveLoginFailureMessage(processResponse) ||
		data?.message ||
		data?.Message ||
		error?.error ||
		error?.message ||
		'Login failed. Please try again.'
	)
}
