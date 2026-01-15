import { motion } from 'framer-motion';

export function AppCardSkeleton() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="relative bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl 
			           border border-border/50 rounded-2xl p-6 overflow-hidden"
		>
			{/* Animated gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
			               animate-shimmer" 
			     style={{
				     backgroundSize: '200% 100%',
				     animation: 'shimmer 2s infinite',
			     }}
			/>
			
			{/* Header skeleton */}
			<div className="relative space-y-4">
				{/* Title */}
				<div className="h-6 bg-text-tertiary/20 rounded-lg w-3/4 animate-pulse" />
				
				{/* Description lines */}
				<div className="space-y-2">
					<div className="h-4 bg-text-tertiary/15 rounded w-full animate-pulse" />
					<div className="h-4 bg-text-tertiary/15 rounded w-5/6 animate-pulse" />
				</div>
				
				{/* Stats */}
				<div className="flex gap-4 pt-4">
					<div className="h-4 bg-text-tertiary/15 rounded w-16 animate-pulse" />
					<div className="h-4 bg-text-tertiary/15 rounded w-20 animate-pulse" />
					<div className="h-4 bg-text-tertiary/15 rounded w-24 animate-pulse" />
				</div>
				
				{/* Tags */}
				<div className="flex gap-2 pt-2">
					<div className="h-6 bg-text-tertiary/15 rounded-full w-16 animate-pulse" />
					<div className="h-6 bg-text-tertiary/15 rounded-full w-20 animate-pulse" />
					<div className="h-6 bg-text-tertiary/15 rounded-full w-14 animate-pulse" />
				</div>
			</div>
			
			<style>{`
				@keyframes shimmer {
					0% { background-position: -200% 0; }
					100% { background-position: 200% 0; }
				}
				.animate-shimmer {
					animation: shimmer 2s infinite;
				}
			`}</style>
		</motion.div>
	);
}

export function AppCardSkeletonGrid({ count = 6 }: { count?: number }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{Array.from({ length: count }).map((_, i) => (
				<AppCardSkeleton key={i} />
			))}
		</div>
	);
}
