import { motion } from 'framer-motion';
import { Sparkles, Zap, Rocket, Code } from 'lucide-react';

export type LoaderVariant = 'dots' | 'pulse' | 'orbit' | 'default';

interface AnimatedLoaderProps {
	variant?: LoaderVariant;
	size?: 'sm' | 'md' | 'lg';
	message?: string;
	className?: string;
}

export function AnimatedLoader({ 
	variant = 'default', 
	size = 'md',
	message,
	className = '' 
}: AnimatedLoaderProps) {
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-12 h-12'
	};

	if (variant === 'dots') {
		return (
			<div className={`flex flex-col items-center gap-3 ${className}`}>
				<div className="flex gap-2">
					{[0, 1, 2].map((i) => (
						<motion.div
							key={i}
							className={`rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 ${
								size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'
							}`}
							animate={{
								y: [0, -12, 0],
								opacity: [0.4, 1, 0.4]
							}}
							transition={{
								duration: 0.8,
								repeat: Infinity,
								delay: i * 0.15,
								ease: "easeInOut"
							}}
						/>
					))}
				</div>
				{message && (
					<motion.p
						className="text-sm text-text-tertiary"
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 2, repeat: Infinity }}
					>
						{message}
					</motion.p>
				)}
			</div>
		);
	}

	if (variant === 'pulse') {
		return (
			<div className={`flex flex-col items-center gap-3 ${className}`}>
				<motion.div
					className={`rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${sizeClasses[size]}`}
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.6, 1, 0.6]
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				>
					<Sparkles className="w-full h-full p-1.5 text-white" />
				</motion.div>
				{message && (
					<p className="text-sm text-text-tertiary animate-pulse">{message}</p>
				)}
			</div>
		);
	}

	if (variant === 'orbit') {
		const orbitSize = size === 'sm' ? 24 : size === 'lg' ? 48 : 32;
		return (
			<div className={`flex flex-col items-center gap-3 ${className}`}>
				<div className="relative" style={{ width: orbitSize, height: orbitSize }}>
					{/* Center */}
					<motion.div 
						className="absolute inset-0 flex items-center justify-center"
						animate={{ rotate: 360 }}
						transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
					>
						<Zap className={`${sizeClasses[size]} text-yellow-500`} />
					</motion.div>
					
					{/* Orbiting particles */}
					{[0, 120, 240].map((_, i) => (
						<motion.div
							key={i}
							className="absolute inset-0"
							style={{ transformOrigin: 'center' }}
							animate={{ rotate: 360 }}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: "linear",
								delay: i * 0.2
							}}
						>
							<div
								className={`absolute rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 ${
									size === 'sm' ? 'w-1.5 h-1.5 -top-1' : size === 'lg' ? 'w-3 h-3 -top-2' : 'w-2 h-2 -top-1.5'
								}`}
								style={{ 
									left: '50%',
									transform: 'translateX(-50%)'
								}}
							/>
						</motion.div>
					))}
				</div>
				{message && (
					<p className="text-sm text-text-tertiary">{message}</p>
				)}
			</div>
		);
	}

	// Default spinner with icon
	return (
		<div className={`flex flex-col items-center gap-3 ${className}`}>
			<motion.div
				className={`relative ${sizeClasses[size]}`}
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			>
				<div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-cyan-500" />
				<div className="absolute inset-0 flex items-center justify-center">
					<Code className="w-1/2 h-1/2 text-blue-500" />
				</div>
			</motion.div>
			{message && (
				<motion.p
					className="text-sm text-text-tertiary"
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity }}
				>
					{message}
				</motion.p>
			)}
		</div>
	);
}

// Alternative: Fun rocket loading
export function RocketLoader({ message = "Launching..." }: { message?: string }) {
	return (
		<div className="flex flex-col items-center gap-4">
			<motion.div
				className="relative"
				animate={{ y: [0, -20, 0] }}
				transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
			>
				<Rocket className="w-12 h-12 text-blue-500" />
				<motion.div
					className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-8"
					animate={{ 
						opacity: [0.3, 0.8, 0.3],
						scaleY: [0.8, 1.2, 0.8]
					}}
					transition={{ duration: 0.5, repeat: Infinity }}
				>
					<div className="w-full h-full bg-gradient-to-b from-orange-500 via-red-500 to-transparent blur-sm" />
				</motion.div>
			</motion.div>
			<p className="text-sm text-text-tertiary font-medium">{message}</p>
		</div>
	);
}
