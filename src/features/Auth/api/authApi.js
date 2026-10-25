import { API_ENDPOINTS } from '@shared/constants/apiurl.contants'
import { apiSlice } from '@shared/services/apiSlice'

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (login) => ({
				url: API_ENDPOINTS.AUTH.LOGIN,
				method: 'POST',
				body: login,
			}),
			invalidatesTags: ['Auth', 'User'],
		}),
	}),
})

export const { useLoginMutation } = authApi
