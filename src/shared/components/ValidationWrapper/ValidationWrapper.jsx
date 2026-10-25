import { useCallback, useState } from 'react'

import { TriangleAlert } from 'lucide-react'

export function ValidationWrapper({
	children,
	error,
	showBorder = true,
	touched: touchedProp = false,
	className,
}) {
	const [touchedInternal, setTouchedInternal] = useState(false)

	const handleFocus = useCallback(() => {
		setTouchedInternal(false)
	}, [])

	const handleBlur = useCallback(() => {
		setTouchedInternal(true)
	}, [])

	const showError = (touchedInternal || touchedProp) && Boolean(error)

	return (
		<div className={`relative ${className || ''}`}>
			<div
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={`rounded-lg ${showError && showBorder ? 'ring-2 ring-[#E8503A]' : ''}`}
			>
				{children}
			</div>
			{showError && (
				<div className="absolute top-full left-[1.5rem] z-[97] -mt-[1.1rem] flex w-fit items-center gap-2 whitespace-nowrap rounded-[5px] bg-[#E3595B] py-[0.8rem] pr-[1.5rem] pl-[1.5rem] text-[1.3rem] leading-[1.8rem] text-white">
					<TriangleAlert size={19} className="shrink-0 text-white" />
					<span>{error}</span>
					<span className="absolute bottom-full left-[0.5rem] h-0 w-0 border-[8px] border-solid border-transparent border-b-[#E3595B]" />
				</div>
			)}
		</div>
	)
}
