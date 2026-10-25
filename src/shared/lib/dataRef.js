const toText = (value) => {
	if (value == null || typeof value === 'boolean') {
		return ''
	}
	if (typeof value === 'string' || typeof value === 'number') {
		return String(value)
	}
	if (Array.isArray(value)) {
		return value.map(toText).find(Boolean) || ''
	}

	return ''
}

export const sanitizeDataRef = (value) =>
	toText(value)
		.trim()
		.toLowerCase()
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')

export function getDataRef(componentName, semanticSource, explicitDataRef) {
	const explicit = sanitizeDataRef(explicitDataRef)
	if (explicit) {
		return { 'data-ref': explicit }
	}

	const component = sanitizeDataRef(componentName)
	const semantic = sanitizeDataRef(semanticSource)
	const value = [component, semantic].filter(Boolean).join('-')

	return { 'data-ref': value || 'component' }
}
