import DOMPurify from 'dompurify'

const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'auth_refresh_token'
const USER_KEY = 'user_data'
const REMEMBERED_USERNAME_KEY = 'remembered_username'

export const saveToken = (token) => {
	if (token) {
		localStorage.setItem(TOKEN_KEY, token)
	}
}

export const getToken = () => {
	return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
	localStorage.removeItem(TOKEN_KEY)
}

export const saveRefreshToken = (token) => {
	if (token) {
		localStorage.setItem(REFRESH_TOKEN_KEY, token)
	}
}

export const getRefreshToken = () => {
	return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const removeRefreshToken = () => {
	localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const saveUser = (user) => {
	if (user) {
		localStorage.setItem(USER_KEY, JSON.stringify(user))
	}
}

export const getUser = () => {
	try {
		const user = localStorage.getItem(USER_KEY)
		return user ? JSON.parse(user) : null
	} catch (error) {
		console.error('Error parsing user data:', error)
		return null
	}
}

export const removeUser = () => {
	localStorage.removeItem(USER_KEY)
}

export const isAuthenticated = () => {
	return !!getToken()
}

export const clearAuth = () => {
	removeToken()
	removeRefreshToken()
	removeUser()
}

export const saveRememberedUsername = (username) => {
	if (username) {
		localStorage.setItem(REMEMBERED_USERNAME_KEY, username)
	}
}

export const getRememberedUsername = () => {
	return localStorage.getItem(REMEMBERED_USERNAME_KEY) || ''
}

export const removeRememberedUsername = () => {
	localStorage.removeItem(REMEMBERED_USERNAME_KEY)
}

export const sanitizeInput = (dirty) => {
	return DOMPurify.sanitize(dirty, {
		ALLOWED_TAGS: [],
		ALLOWED_ATTR: [],
	})
}
