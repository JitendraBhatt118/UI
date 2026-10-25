export const ENDPOINTS_WITH_LOCAL_ERROR_TOAST = ['login']

export const getRejectedEndpointName = (action) => {
	if (!action?.type?.endsWith('/rejected')) {
		return null
	}

	return action.meta?.arg?.endpointName ?? null
}

export const isRejectedEndpoint = (action, endpointNames) => {
	const name = getRejectedEndpointName(action)
	return name != null && endpointNames.includes(name)
}

export const shouldSuppressGlobalErrorToast = (action) =>
	isRejectedEndpoint(action, ENDPOINTS_WITH_LOCAL_ERROR_TOAST)

export const isLoginRejectedRequest = (action) => isRejectedEndpoint(action, ['login'])
