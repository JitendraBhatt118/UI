import * as React from 'react'

import { getDataRef } from '@shared/lib/dataRef'
import { cn } from '@shared/lib/utils'

const BaseCard = React.forwardRef(({ className, children, dataRef, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'rounded-xl bg-[var(--color-bg-surface)] text-card-foreground shadow-[0_0_6px_rgba(0,0,0,0.2)]',
			className
		)}
		{...props}
		{...getDataRef('card', [props['aria-label'], props.id], dataRef)}
	>
		{children}
	</div>
))
BaseCard.displayName = 'Card'

const Card = React.forwardRef(({ children, className = '', ...props }, ref) => {
	return (
		<BaseCard ref={ref} className={className} {...props}>
			{children}
		</BaseCard>
	)
})
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, dataRef, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex flex-col space-y-1.5 p-6', className)}
		{...props}
		{...getDataRef('card-header', [props['aria-label'], props.id], dataRef)}
	/>
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ className, children, dataRef, ...props }, ref) => (
	<h6
		ref={ref}
		className={cn('font-bold', className)}
		{...props}
		{...getDataRef('card-title', children, dataRef)}
	>
		{children}
	</h6>
))
CardTitle.displayName = 'CardTitle'

const CardContent = React.forwardRef(({ className, dataRef, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('p-6 pt-0', className)}
		{...props}
		{...getDataRef('card-content', [props['aria-label'], props.id], dataRef)}
	/>
))
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardContent }
