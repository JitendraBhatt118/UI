import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { selectCurrentUser } from '@entities/User/model/userSlice'

export const Home = () => {
	const { t } = useTranslation()
	const currentUser = useSelector(selectCurrentUser)

	return (
		<section className="p-10">
			<div className="max-w-[72rem] mx-auto bg-white rounded-2xl card-shadow p-10">
				<h1 className="text-[2.8rem] font-bold text-[var(--color-text-primary)] mb-4">
					{t('common.welcome')}
					{currentUser?.userName ? `, ${currentUser.userName}` : ''}
				</h1>
				<p className="text-[1.6rem] text-[var(--color-text-secondary)]">
					{t('common.dashboardPlaceholder')}
				</p>
			</div>
		</section>
	)
}
