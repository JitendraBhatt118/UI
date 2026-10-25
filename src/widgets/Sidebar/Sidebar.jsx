import { BookOpen, ChartColumn, GraduationCap, House, LayoutDashboard, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import schoolLogoIcon from '@app/assets/images/logos/school-logo-icon.svg'

import { ROUTES } from '@shared/constants/route.constants'

import './Sidebar.scss'

const navItems = [
	{ id: 'home', label: 'Home', to: ROUTES.HOME, icon: House },
	{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
	{ id: 'students', label: 'Students', icon: GraduationCap },
	{ id: 'teachers', label: 'Teachers', icon: Users },
	{ id: 'classes', label: 'Classes', icon: BookOpen },
	{ id: 'reports', label: 'Reports', icon: ChartColumn },
]

export function Sidebar() {
	return (
		<aside id="sidebar" className="sidebar custom-scrollbar">
			<div className="sidebar-content">
				<NavLink className="sidebar-brand" to={ROUTES.HOME}>
					<span className="logo-icon">
						<img src={schoolLogoIcon} alt="School Portal" />
					</span>
				</NavLink>
				<ul className="sidebar-nav">
					{navItems.map((item) => {
						const Icon = item.icon
						const content = (
							<>
								<Icon className="sidebar-icon" size={24} strokeWidth={1.75} />
								<span>{item.label}</span>
							</>
						)

						return (
							<li key={item.id} className="sidebar-item">
								{item.to ? (
									<NavLink
										to={item.to}
										className={({ isActive }) => `sidebar-link${isActive ? ' current' : ''}`}
									>
										{content}
									</NavLink>
								) : (
									<button type="button" className="sidebar-link">
										{content}
									</button>
								)}
							</li>
						)
					})}
				</ul>
			</div>
		</aside>
	)
}
