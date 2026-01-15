import React from 'react';
import clsx from 'clsx';
import { AdrielLogo } from './layout/adriel-logo';
import { Link } from 'react-router';

export function Header({
	className,
	children,
}: React.ComponentProps<'header'>) {
	return (
		<header
			className={clsx(
				'h-14 shrink-0 w-full px-4 border-b border-white/10 flex items-center',
				className,
			)}
		>
			<h1 className="flex items-center gap-2 mx-4">
				<Link to="/" className="transition-opacity hover:opacity-70">
					<AdrielLogo
						className="h-6 w-6"
						title="Adriel AI"
					/>
				</Link>
			</h1>
			<div className="flex-1"></div>
			<div className="flex items-center gap-4">
				{children}
			</div>
		</header>
	);
}
