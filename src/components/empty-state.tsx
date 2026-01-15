/**
 * Enhanced Empty State Component
 * Shows helpful guidance when users have no apps yet
 */

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Code2, Palette, Zap } from 'lucide-react';

interface EmptyStateProps {
	onTryExample: (prompt: string) => void;
}

const examplePrompts = [
	{
		icon: <Code2 className="h-5 w-5" />,
		title: 'Todo App',
		prompt: 'Create a modern todo app with dark mode, animations, and local storage',
		gradient: 'from-cyan-500 to-blue-500',
	},
	{
		icon: <Palette className="h-5 w-5" />,
		title: 'Landing Page',
		prompt: 'Build a landing page for a SaaS product with hero section, features, and pricing',
		gradient: 'from-purple-500 to-pink-500',
	},
	{
		icon: <Zap className="h-5 w-5" />,
		title: 'Dashboard',
		prompt: 'Create a analytics dashboard with charts, tables, and real-time data',
		gradient: 'from-orange-500 to-red-500',
	},
];

export function EmptyState({ onTryExample }: EmptyStateProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="w-full max-w-4xl mx-auto px-4 py-16 text-center"
		>
			{/* Icon */}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: 'spring', delay: 0.2 }}
				className="flex justify-center mb-6"
			>
				<div className="relative">
					<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />
					<div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
						<Sparkles className="h-12 w-12 text-cyan-400" />
					</div>
				</div>
			</motion.div>

			{/* Heading */}
			<motion.h2
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent"
			>
				Let's Build Something Amazing
			</motion.h2>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
				className="text-lg text-white/70 mb-12 max-w-2xl mx-auto"
			>
				You haven't created any apps yet. Start by describing what you want to build,
				or try one of these examples to see the magic in action! ✨
			</motion.p>

			{/* Example Cards */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
			>
				{examplePrompts.map((example, index) => (
					<motion.button
						key={example.title}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 + index * 0.1 }}
						whileHover={{ scale: 1.02, y: -4 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => onTryExample(example.prompt)}
						className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 p-6 text-left transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
					>
						{/* Gradient overlay on hover */}
						<div className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
						
						<div className="relative">
							<div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${example.gradient} bg-opacity-10 border border-white/10 mb-4`}>
								{example.icon}
							</div>
							<h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-between">
								{example.title}
								<ArrowRight className="h-5 w-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-300" />
							</h3>
							<p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
								{example.prompt}
							</p>
						</div>
					</motion.button>
				))}
			</motion.div>

			{/* Tips */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.9 }}
				className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500/10 border border-blue-500/30"
			>
				<Sparkles className="h-4 w-4 text-blue-400" />
				<span className="text-sm text-blue-200">
					💡 Tip: The more specific your prompt, the better the result!
				</span>
			</motion.div>
		</motion.div>
	);
}
