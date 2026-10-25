import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_ENDPOINTS } from '@shared/constants/apiurl.contants'
import { getToken } from '@shared/lib/auth'

const rawBaseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_BASE_URL || '',
	prepareHeaders: (headers, { arg }) => {
		const token = getToken()
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}

		const isFormDataRequest = arg?.body instanceof FormData

		if (isFormDataRequest) {
			headers.delete('Content-Type')
		} else if (!headers.has('Content-Type')) {
			headers.set('Content-Type', 'application/json')
		}

		return headers
	},
})

const shouldSkipAuthHeaderIssues = (args) => {
	const url = typeof args === 'string' ? args : args?.url
	if (typeof url !== 'string') {
		return true
	}
	return url === API_ENDPOINTS.AUTH.LOGIN
}

const baseQueryWithReauth = async (args, api, extraOptions) => {
	const result = await rawBaseQuery(args, api, extraOptions)
	if (result.error?.status !== 401 || shouldSkipAuthHeaderIssues(args)) {
		return result
	}
	return result
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Auth', 'User'],
	endpoints: () => ({}),
})
