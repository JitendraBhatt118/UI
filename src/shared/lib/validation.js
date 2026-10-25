export const getEmailValidationCode = (email) => {
	const trimmed = typeof email === 'string' ? email.trim() : ''
	if (!trimmed) {
		return 'required'
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(trimmed)) {
		return 'invalid'
	}
	return null
}

export const validateEmail = (email) => {
	const code = getEmailValidationCode(email)
	if (code === 'required') {
		return 'Email is required'
	}
	if (code === 'invalid') {
		return 'Please enter a valid email'
	}
	return null
}

export const validatePassword = (password) => {
	if (!password) {
		return 'Password is required'
	}
	if (password.length < 6) {
		return 'Password must be at least 6 characters'
	}
	return null
}
