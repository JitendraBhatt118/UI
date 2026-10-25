export const Loader = ({ fullScreen = false, size = 'md', color = '#2563eb' }) => {
	const sizeClasses = {
		xs: 'h-6 w-6',
		sm: 'h-8 w-8',
		md: 'h-12 w-12',
		lg: 'h-16 w-16',
	}

	const loader = (
		<div className="flex items-center justify-center">
			<div
				className={`animate-spin rounded-full border-2 ${sizeClasses[size]}`}
				style={{
					borderColor: color,
					borderTopColor: 'transparent',
				}}
			/>
		</div>
	)

	if (fullScreen) {
		return (
			<div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
				{loader}
			</div>
		)
	}

	return loader
}
