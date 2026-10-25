import { useState } from 'react'

import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import schoolLogo from '@app/assets/images/logos/school-logo.svg'

import { useLoginMutation } from '@features/Auth/api/authApi'
import {
	resolveLoginFailureMessage,
	resolveLoginRequestErrorMessage,
} from '@features/Auth/lib/resolve-login-error-message'

import { setUser } from '@entities/User/model/userSlice'

import { Button } from '@shared/components/Button'
import { CardContent, CardHeader, CardTitle } from '@shared/components/Card'
import { FloatingLabelInput } from '@shared/components/Input/FloatingLabelInput'
import { InputType } from '@shared/components/Input/InputType'
import { Loader } from '@shared/components/Layout/Loader'
import { ValidationWrapper } from '@shared/components/ValidationWrapper/ValidationWrapper'
import { ROUTES } from '@shared/constants/route.constants'
import {
	clearAuth,
	getRememberedUsername,
	removeRememberedUsername,
	sanitizeInput,
	saveRefreshToken,
	saveRememberedUsername,
	saveToken,
} from '@shared/lib/auth'
import { validateEmail, validatePassword } from '@shared/lib/validation'

const LOGIN_ERROR_TOAST_ID = 'login-error-toast'

const showLoginError = (message) => {
	toast.error(message, { toastId: LOGIN_ERROR_TOAST_ID })
}

const pickProcessResponse = (result) =>
	result?.data?.dataProcessResponse ??
	result?.data?.DataProcessResponse ??
	result?.Data?.dataProcessResponse ??
	result?.Data?.DataProcessResponse

const pickAuthResponse = (result) =>
	result?.data?.authenticationResponse ??
	result?.data?.AuthenticationResponse ??
	result?.Data?.authenticationResponse ??
	result?.Data?.AuthenticationResponse

export const LoginForm = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [submitted, setSubmitted] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [login] = useLoginMutation()

	const [formData, setFormData] = useState({
		userName: getRememberedUsername(),
		password: '',
	})

	const [rememberMe, setRememberMe] = useState(!!getRememberedUsername())
	const [errors, setErrors] = useState({})

	const handleChange = (e) => {
		const { name, value } = e.target
		const sanitizedValue = sanitizeInput(value)

		setFormData((prev) => ({
			...prev,
			[name]: sanitizedValue,
		}))

		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: null,
			}))
		}
	}

	const validate = () => {
		const newErrors = {}

		const emailError = validateEmail(formData.userName)
		if (emailError) {
			newErrors.userName = emailError
		}

		const passwordError = validatePassword(formData.password)
		if (passwordError) {
			newErrors.password = passwordError
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleForgotPassword = (e) => {
		e.preventDefault()
		toast.info(t('auth.forgotPasswordSoon'))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setSubmitted(true)

		if (isSubmitting) {
			return
		}

		if (!validate()) {
			return
		}

		setIsSubmitting(true)

		try {
			const result = await login({
				username: formData.userName,
				password: formData.password,
			}).unwrap()

			const processResponse = pickProcessResponse(result)
			const isSuccess = processResponse?.isSuccess === true || processResponse?.IsSuccess === true

			if (!isSuccess) {
				showLoginError(resolveLoginFailureMessage(processResponse) || 'Login failed.')
				return
			}

			const authResponse = pickAuthResponse(result)
			const accessToken = authResponse?.accessToken ?? authResponse?.AccessToken
			const refreshToken = authResponse?.refreshToken ?? authResponse?.RefreshToken

			if (!accessToken) {
				showLoginError('Login failed. Please try again.')
				return
			}

			clearAuth()
			saveToken(accessToken)
			if (refreshToken) {
				saveRefreshToken(refreshToken)
			}

			if (rememberMe) {
				saveRememberedUsername(formData.userName)
			} else {
				removeRememberedUsername()
			}

			const user = {
				userName: formData.userName,
				userId: processResponse?.rowId ?? processResponse?.RowId ?? null,
			}

			dispatch(setUser(user))
			toast.success(t('auth.loginSuccess'))
			navigate(ROUTES.HOME, { replace: true })
		} catch (error) {
			console.error('Login request failed', error)
			showLoginError(resolveLoginRequestErrorMessage(error))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} noValidate>
			<div className="max-w-[49.5rem] my-0 mx-auto">
				<CardHeader className="p-0 space-y-0">
					<img src={schoolLogo} alt="School Portal" className="mb-3" style={{ maxWidth: '22rem' }} />
					<CardTitle className="text-[1.8rem] leading-8 !my-[2rem]">{t('common.welcome')}</CardTitle>
				</CardHeader>

				<CardContent className="p-0">
					<ValidationWrapper
						error={validateEmail(formData.userName)}
						touched={submitted}
						className="z-[3]"
					>
						<FloatingLabelInput
							id="userName"
							label={t('auth.email')}
							type="email"
							name="userName"
							value={formData.userName}
							onChange={handleChange}
							autoComplete="email"
						/>
					</ValidationWrapper>

					<ValidationWrapper
						error={validatePassword(formData.password)}
						touched={submitted}
						className="mt-8 z-[2]"
					>
						<FloatingLabelInput
							id="password"
							label={t('auth.password')}
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							autoComplete="current-password"
						/>
					</ValidationWrapper>

					<div className="flex items-center justify-between mt-8 mb-12">
						<InputType
							type="checkbox"
							label={t('auth.rememberMe')}
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
							labelClassName="!font-normal"
						/>
						<button
							type="button"
							onClick={handleForgotPassword}
							className="hover:cursor-pointer text-[var(--color-text-secondary)] font-[400] text-[1.4rem] leading-10 bg-transparent border-0"
						>
							{t('auth.forgotPassword')}
						</button>
					</div>

					<Button
						type="submit"
						loading={isSubmitting}
						className="w-full mt-4 h-[5.8rem] btn-primary flex items-center justify-center gap-2"
					>
						{isSubmitting ? (
							<Loader size="sm" color="currentColor" />
						) : (
							<>
								{t('auth.logIn')}
								<ArrowRight className="ml-5" size={22} aria-hidden />
							</>
						)}
					</Button>
				</CardContent>
			</div>
		</form>
	)
}
