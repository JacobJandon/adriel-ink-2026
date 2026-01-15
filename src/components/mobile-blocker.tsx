/**
 * Mobile Blocker Component
 * Displays a full-screen message suggesting users switch to desktop for the best experience
 */

import { motion } from 'framer-motion';
import { Monitor, Smartphone, ArrowRight } from 'lucide-react';
import { AdrielLogo } from './layout/adriel-logo';

export function MobileBlocker() {
	return (
		<div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0A0F1C] via-[#0D1425] to-[#050810] overflow-hidden">
			{/* Animated background orbs */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
				<motion.div
					className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1
					}}
				/>
			</div>

			{/* Content */}
			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
				{/* Logo */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-12"
				>
					<div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#007AFF] to-[#00C6FF] flex items-center justify-center shadow-2xl shadow-blue-500/30">
						<AdrielLogo className="w-10 h-10 text-white" />
					</div>
				</motion.div>

				{/* Devices illustration */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="relative mb-12"
				>
					<div className="flex items-center gap-8">
						{/* Mobile phone (crossed out) */}
						<motion.div
							className="relative"
							animate={{ rotate: [-2, 2, -2] }}
							transition={{ duration: 3, repeat: Infinity }}
						>
							<div className="w-16 h-24 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 flex items-center justify-center relative overflow-hidden">
								<Smartphone className="w-8 h-8 text-gray-400" />
								{/* Red X overlay */}
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="w-20 h-0.5 bg-red-500 rotate-45 shadow-lg shadow-red-500/50" />
									<div className="w-20 h-0.5 bg-red-500 -rotate-45 absolute shadow-lg shadow-red-500/50" />
								</div>
							</div>
						</motion.div>

						{/* Arrow */}
						<motion.div
							animate={{ x: [0, 10, 0] }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<ArrowRight className="w-8 h-8 text-cyan-400" />
						</motion.div>

						{/* Desktop monitor (highlighted) */}
						<motion.div
							animate={{ 
								scale: [1, 1.05, 1],
								boxShadow: [
									"0 0 20px rgba(0, 198, 255, 0.3)",
									"0 0 40px rgba(0, 198, 255, 0.6)",
									"0 0 20px rgba(0, 198, 255, 0.3)"
								]
							}}
							transition={{ duration: 2, repeat: Infinity }}
							className="w-24 h-20 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 border-2 border-cyan-400 flex items-center justify-center relative"
						>
							<Monitor className="w-10 h-10 text-white" />
							{/* Glow effect */}
							<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-400/20" />
						</motion.div>
					</div>
				</motion.div>

				{/* Title */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent"
				>
					Desktop Experience Required
				</motion.h1>

				{/* Description */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="text-white/70 text-center text-lg leading-relaxed mb-8 max-w-sm"
				>
					Adriel AI is optimized for desktop. Switch to a larger screen for the full AI-powered development experience.
				</motion.p>

				{/* Features list */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="space-y-3 mb-12 w-full max-w-sm"
				>
					{[
						"Real-time code preview",
						"Advanced AI interactions",
						"Multi-panel workspace",
						"Full development tools"
					].map((feature, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.7 + i * 0.1 }}
							className="flex items-center gap-3 text-white/60"
						>
							<div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
							<span className="text-sm">{feature}</span>
						</motion.div>
					))}
				</motion.div>

				{/* Continue anyway button (small, subtle) */}
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 1 }}
					onClick={() => {
						// Store user preference and hide blocker
						localStorage.setItem('mobile-blocker-dismissed', 'true');
						document.getElementById('mobile-blocker')?.remove();
					}}
					className="text-white/40 hover:text-white/60 text-sm underline transition-colors duration-300"
				>
					Continue anyway
				</motion.button>

				{/* Footer hint */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 1.2 }}
					className="absolute bottom-8 text-center"
				>
					<p className="text-white/30 text-xs">
						Best viewed on screens 1024px or wider
					</p>
				</motion.div>
			</div>

			{/* Grid pattern overlay */}
			<div 
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
					backgroundSize: '40px 40px'
				}}
			/>
		</div>
	);
}
