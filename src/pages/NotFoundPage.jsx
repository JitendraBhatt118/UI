import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ROUTES } from '@shared/constants/route.constants'

const NotFoundPage = () => {
	const { t } = useTranslation()

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
			<div className="max-w-md w-full text-center">
				<div className="mb-8">
					<h1 className="text-9xl font-bold text-secondary">404</h1>
					<h2 className="text-3xl font-semibold text-gray-900 mt-4">{t('errors.pageNotFound')}</h2>
					<p className="text-gray-600 mt-2">{t('errors.pageNotExists')}</p>
				</div>
				<Link
					to={ROUTES.HOME}
					className="inline-block bg-secondary text-white px-6 py-3 rounded-md hover:opacity-90 transition-colors"
				>
					{t('errors.backToHome')}
				</Link>
			</div>
		</div>
	)
}

export default NotFoundPage
