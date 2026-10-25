import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { selectIsAuthenticated } from '@entities/User/model/userSlice'

import { ROUTES } from '@shared/constants/route.constants'

export const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated)

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} replace />
	}

	return children
}
