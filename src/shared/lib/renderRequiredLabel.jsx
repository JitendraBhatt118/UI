export function renderRequiredLabel(label) {
	if (typeof label !== 'string') {
		return label
	}

	const match = label.match(/^(.*?)(\s*\*)$/)
	if (!match) {
		return label
	}

	const [, text, requiredMark] = match

	return (
		<>
			{text}
			<span className="text-red-500">{requiredMark}</span>
		</>
	)
}
