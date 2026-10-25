import { useEffect } from 'react'

import { LoginForm } from '@features/Auth/components/LoginForm'

import { Card } from '@shared/components/Card'

const LoginPage = () => {
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', 'light')
	}, [])

	return (
		<Card className="card-shadow py-[3.5rem] md:px-[5rem] max-w-[46rem] w-full min-w-[30rem] rounded-2xl px-0">
			<LoginForm />
		</Card>
	)
}

export default LoginPage
