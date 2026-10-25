import { Outlet } from 'react-router-dom'

import { Sidebar } from '@widgets/Sidebar'

import { Header } from './Header'

export const Layout = () => {
	return (
		<div className="flex items-stretch w-full h-full min-w-0 min-h-screen">
			<Sidebar />
			<main className="w-full h-screen overflow-x-hidden">
				<Header />
				<Outlet />
			</main>
		</div>
	)
}
