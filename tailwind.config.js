/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-default-export
export default {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background-main)',
				surface: {
					DEFAULT: 'var(--surface-main)',
					soft: 'var(--surface-soft)',
					muted: 'var(--surface-muted)',
					elevated: 'var(--surface-elevated)',
				},
				border: 'var(--border-main)',
				black1: 'var(--text-primary)',
				black3: 'var(--text-secondary)',
				black6: 'var(--text-light)',
				black9: 'var(--text-muted)',
				brand: {
					blue: 'var(--brand-blue)',
					purple: 'var(--brand-purple)',
				},
				secondary: {
					DEFAULT: 'var(--brand-secondary)',
				},
				link: {
					DEFAULT: 'var(--link-main)',
					secondary: 'var(--link-secondary)',
				},
				system: {
					green: 'var(--green)',
					red: 'var(--red)',
					yellow: 'var(--yellow)',
					orange: 'var(--orange)',
					blue: 'var(--blue)',
				},
			},
			borderColor: {
				DEFAULT: 'var(--border-main)',
				outline: 'var(--outline-border)',
			},
			borderRadius: {
				DEFAULT: 'var(--radius)',
			},
			boxShadow: {
				DEFAULT: 'var(--shadow)',
				dark: 'var(--shadow-dark)',
				bottom: 'var(--shadow-bottom)',
			},
			backgroundImage: {
				primary: 'var(--gradient)',
				'theme-gradient': 'var(--theme-gradient)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
