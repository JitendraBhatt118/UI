import { lazy, Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'

import { BlankLayout } from '@widgets/Layout/BlankLayout'
import { Layout } from '@widgets/Layout/Layout'

import { GuestRoute } from '@shared/components/Layout/GuestRoute'
import { ProtectedRoute } from '@shared/components/Layout/ProtectedRoute'
import { ROUTES } from '@shared/constants/route.constants'

const LoginPage = lazy(() => import('@pages/LoginPage'))
const HomePage = lazy(() => import('@pages/HomePage'))
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'))

export const AppRouter = () => {
	return (
		<Suspense fallback={<div />}>
			<Routes>
				<Route path="/" element={<BlankLayout />}>
					<Route
						index
						element={
							<GuestRoute>
								<LoginPage />
							</GuestRoute>
						}
					/>
				</Route>
				<Route path={ROUTES.LOGIN} element={<BlankLayout />}>
					<Route
						index
						element={
							<GuestRoute>
								<LoginPage />
							</GuestRoute>
						}
					/>
				</Route>
				<Route
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				>
					<Route path={ROUTES.HOME} element={<HomePage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	)
}
