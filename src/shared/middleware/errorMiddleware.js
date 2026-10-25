import { toast } from 'react-toastify'

import { clearUser } from '@entities/User/model/userSlice'

import { ROUTES } from '@shared/constants/route.constants'
import { clearAuth } from '@shared/lib/auth'
import { isLoginRejectedRequest, shouldSuppressGlobalErrorToast } from '@shared/lib/rtk-query-error'

let isLoggingOut = false

export const errorMiddleware = (store) => (next) => (action) => {
	if (action.type.endsWith('/rejected')) {
		if (action.meta?.condition) {
			return next(action)
		}

		const error = action.payload || action.error

		if (error?.message === 'Aborted due to condition callback returning false') {
			return next(action)
		}

		if (shouldSuppressGlobalErrorToast(action)) {
			return next(action)
		}

		if (error?.status === 401) {
			if (isLoginRejectedRequest(action)) {
				return next(action)
			}
			if (isLoggingOut) {
				return next(action)
			}
			isLoggingOut = true
			clearAuth()
			store.dispatch(clearUser())
			toast.error('Session expired. Please login again.', {
				onClick: () => {
					window.location.href = ROUTES.LOGIN
				},
				onClose: () => {
					window.location.href = ROUTES.LOGIN
				},
			})
			isLoggingOut = false
		} else if (error?.data?.message) {
			toast.error(error.data.message, { toastId: error.data.message })
		} else if (error?.message) {
			toast.error(error.message, { toastId: error.message })
		}
	}

	return next(action)
}
