import { forwardRef, useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { getDataRef } from '@shared/lib/dataRef'
import { renderRequiredLabel } from '@shared/lib/renderRequiredLabel'

export const FloatingLabelInput = forwardRef((
	{
		label,
		id,
		className,
		inputClassName,
		labelClassName,
		endAdornment,
		endAdornmentClassName,
		type = 'text',
		error,
		dataRef,
		...props
	},
	ref
) => {
	const [showPassword, setShowPassword] = useState(false)

	const inputId = id || (label || '').replace(/\s+/g, '-').toLowerCase()
	const isPassword = type === 'password'
	const hasEndAdornment = Boolean(endAdornment)
	let inputType = type
	if (isPassword) {
		inputType = showPassword ? 'text' : 'password'
	}
	return (
		<div className={`relative ${className || ''}`}>
			{error && (
				<div className="text-red-500 text-[1.4rem] font-medium mb-1.5 absolute -top-[2.2rem] left-0">
					{error}
				</div>
			)}
			<input
				ref={ref}
				{...props}
				id={inputId}
				type={inputType}
				placeholder=" "
				className={`float-input h-[6rem] w-full rounded-lg px-3 outline-none transition-colors duration-200 bg-[var(--white-color)] text-[var(--color-text-primary)] border text-[1.8rem] font-bold pt-8 pb-0 pl-8 ${hasEndAdornment || isPassword ? 'pr-[8.8rem]' : 'pr-8'} ${error ? 'border-red-500' : 'border-[var(--color-border-muted)]'} ${inputClassName || ''}`}
				{...getDataRef('input', [label, props['aria-label'], props.name, inputId], dataRef)}
			/>
			<label
				htmlFor={inputId}
				className={`float-label absolute left-[2.2rem] top-1/2 -translate-y-1/2 text-[1.7rem] pointer-events-none transition-all duration-200 font-normal ${error ? 'text-red-400' : 'text-[var(--color-text-muted)]'} ${labelClassName || ''}`}
			>
				{renderRequiredLabel(label)}
			</label>
			{hasEndAdornment && (
				<div className={`absolute right-[1.6rem] top-1/2 -translate-y-1/2 ${endAdornmentClassName || ''}`}>
					{endAdornment}
				</div>
			)}
			{isPassword && (
				<button
					type="button"
					onClick={() => setShowPassword((prev) => !prev)}
					className="absolute right-[2rem] top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition"
					aria-label={showPassword ? 'Hide password' : 'Show password'}
				>
					{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</button>
			)}
		</div>
	)
})
FloatingLabelInput.displayName = 'FloatingLabelInput'
