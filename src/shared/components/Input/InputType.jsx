import { getDataRef } from '@shared/lib/dataRef'

export function InputType({
	type = 'text',
	className,
	inputClassName,
	label,
	labelClassName,
	dataRef,
	...props
}) {
	if (type === 'checkbox') {
		return (
			<label className={`input-wrapper checkbox-tick-wrapper ${className || ''}`}>
				<div className="input-main-content">
					<input
						type="checkbox"
						className={`checkbox checkbox-tick${inputClassName ? ` ${inputClassName}` : ''}`}
						{...props}
						{...getDataRef(type, [label, props['aria-label'], props.name, props.id], dataRef)}
					/>
					{label && <span className={`input-label ${labelClassName || ''}`}>{label}</span>}
				</div>
			</label>
		)
	}

	return (
		<input
			type={type}
			className={`input-text ${className || ''}`}
			{...props}
			{...getDataRef(
				'input',
				[label, props['aria-label'], props.placeholder, props.name, props.id],
				dataRef
			)}
		/>
	)
}
