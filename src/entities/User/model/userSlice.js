import { createSlice } from '@reduxjs/toolkit'

import { getToken, getUser, removeUser, saveUser } from '@shared/lib/auth'

const initialState = {
	currentUser: getUser(),
	isAuthenticated: !!getToken() && !!getUser(),
	loading: false,
	error: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload || {}
			state.isAuthenticated = !!getToken() && !!state.currentUser
			state.error = null
			saveUser(state.currentUser)
		},
		clearUser: (state) => {
			state.currentUser = null
			state.isAuthenticated = false
			state.error = null
			removeUser()
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		setError: (state, action) => {
			state.error = action.payload
			state.loading = false
		},
	},
})

export const { setUser, clearUser, setLoading, setError } = userSlice.actions

export const selectCurrentUser = (state) => state.user?.currentUser
export const selectIsAuthenticated = (state) => state.user?.isAuthenticated
export const selectUserLoading = (state) => state.user?.loading
export const selectUserError = (state) => state.user?.error

export const userReducer = userSlice.reducer
