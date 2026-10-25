/* eslint-disable no-console */
export const loggerMiddleware = (store) => (next) => (action) => {
	if (import.meta.env.DEV) {
		console.group(action.type)
		console.info('dispatching', action)
		const result = next(action)
		console.log('next state', store.getState())
		console.groupEnd()
		return result
	}

	return next(action)
}
