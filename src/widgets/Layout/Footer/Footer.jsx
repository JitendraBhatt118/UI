export const Footer = () => {
	return (
		<footer className="flex items-center gap-4 text-[1.4rem] text-[var(--color-text-secondary)] mb-[2.4rem]">
			<span>
				© {new Date().getFullYear()} School Portal. All rights reserved.
			</span>
		</footer>
	)
}
