import { Outlet } from 'react-router-dom'

import { Footer } from './Footer/Footer'

export const BlankLayout = () => {
	return (
		<div className="flex flex-col justify-between items-center h-full min-h-screen bg-[rgba(106,83,214,0.1)]">
			<div />
			<Outlet />
			<Footer />
		</div>
	)
}
