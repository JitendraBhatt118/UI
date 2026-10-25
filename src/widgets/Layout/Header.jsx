import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import schoolLogo from '@app/assets/images/logos/school-logo.svg'

import { clearUser, selectCurrentUser } from '@entities/User/model/userSlice'

import { Button } from '@shared/components/Button'
import { ROUTES } from '@shared/constants/route.constants'
import { clearAuth } from '@shared/lib/auth'

export const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const currentUser = useSelector(selectCurrentUser)

	const handleLogout = () => {
		clearAuth()
		dispatch(clearUser())
		toast.success('Logged out successfully')
		navigate(ROUTES.LOGIN, { replace: true })
	}

	return (
		<header className="flex items-center justify-between px-8 py-6 bg-white shadow-bottom">
			<img src={schoolLogo} alt="School Portal" className="h-[3.6rem]" />
			<div className="flex items-center gap-6">
				<span className="text-[1.5rem] text-[var(--color-text-secondary)]">
					{currentUser?.userName}
				</span>
				<Button
					type="button"
					onClick={handleLogout}
					className="h-[4.2rem] btn-secondary !ml-0 min-w-[9rem]"
				>
					Logout
				</Button>
			</div>
		</header>
	)
}
