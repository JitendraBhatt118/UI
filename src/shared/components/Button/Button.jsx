import { getDataRef } from '@shared/lib/dataRef'

export const Button = ({
	children,
	type = 'button',
	disabled = false,
	loading = false,
	className,
	icon,
	dataRef,
	...props
}) => {
	return (
		<button
			type={type}
			disabled={disabled || loading}
			{...props}
			{...getDataRef('button', [children, props['aria-label'], props.title], dataRef)}
			className={`bg-transparent rounded-[5rem] cursor-pointer text-[1.6rem] leading-none min-w-[11rem] outline-none p-0 transition-all duration-500 ease-in-out text-center px-[3rem] ${className || ''}`}
		>
			{icon}
			{children}
		</button>
	)
}
