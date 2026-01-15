import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';
import { ReactNode } from 'react';

interface PageTransitionProps {
	children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={location.pathname}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ 
					duration: 0.2,
					ease: "easeInOut"
				}}
				className="h-full w-full"
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
