import { useEffect, useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthButton } from '../auth/auth-button';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { ChevronRight, AlertCircle, TrendingUp } from 'lucide-react';
import { usePlatformStatus } from '@/hooks/use-platform-status';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocation } from 'react-router';
import clsx from 'clsx';

export function GlobalHeader() {
	const { user } = useAuth();
	const { status } = usePlatformStatus();
	const [isChangelogOpen, setIsChangelogOpen] = useState(false);
	const hasMaintenanceMessage = Boolean(status.hasActiveMessage && status.globalUserMessage.trim().length > 0);
	const hasChangeLogs = Boolean(status.changeLogs && status.changeLogs.trim().length > 0);
	const { pathname } = useLocation();

	useEffect(() => {
		if (!hasChangeLogs) {
			setIsChangelogOpen(false);
		}
	}, [hasChangeLogs]);

	return (
		<Dialog open={isChangelogOpen} onOpenChange={setIsChangelogOpen}>
			<motion.header
				initial={{ y: -10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				className={clsx(
					"sticky top-0 z-50",
					pathname !== "/" 
						? "bg-bg-3/90 backdrop-blur-xl" 
						: "bg-transparent"
				)}
			>
				<div className="relative">
					{/* Main content with improved spacing */}
					<div className="relative z-10 flex items-center justify-between gap-4 px-6 py-3.5">
						{/* Left section - Enhanced */}
						{user ? (
							<motion.div
								whileTap={{ scale: 0.97 }}
								transition={{
									type: 'spring',
									stiffness: 400,
									damping: 17,
								}}
								className='flex items-center gap-4'
							>
								<SidebarTrigger className="h-10 w-10 text-text-primary rounded-xl bg-gradient-to-br from-black/60 to-black/40 border border-white/15 hover:from-black/80 hover:to-black/60 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/15 backdrop-blur-md transition-all duration-300 hover:scale-105" />
								
								{hasMaintenanceMessage && (
									<motion.button
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.1 }}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										type="button"
										onClick={hasChangeLogs ? () => setIsChangelogOpen(true) : undefined}
										disabled={!hasChangeLogs}
										className={clsx(
											"flex max-w-full items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm backdrop-blur-md transition-all duration-300",
											"border-accent/50 bg-gradient-to-r from-accent/15 to-accent/10 text-text-primary",
											"hover:from-accent/25 hover:to-accent/15 hover:border-accent/70 hover:shadow-md hover:shadow-accent/10",
											"focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-bg-3",
											!hasChangeLogs && "opacity-50 cursor-not-allowed pointer-events-none"
										)}
										aria-label="Platform updates"
									>
										<AlertCircle className="h-4 w-4 text-accent animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
										<span className="truncate max-w-[40ch] md:max-w-[60ch]">
											{status.globalUserMessage}
										</span>
										<ChevronRight className="h-4 w-4 text-accent/80" />
									</motion.button>
								)}
							</motion.div>
						) : (
							<div className="h-10" />
						)}

						{/* Right section - Enhanced sign-in area */}
						<motion.div
							initial={{ opacity: 0, x: 10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
							className="flex items-center gap-3"
						>
							{/* Quick Stats - Enhanced */}
							{user && (
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.3 }}
									whileHover={{ scale: 1.05, y: -1 }}
									className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-br from-black/40 to-black/20 border border-white/10 backdrop-blur-sm shadow-sm hover:border-green-400/30 hover:shadow-md hover:shadow-green-500/10 transition-all duration-300"
								>
									<TrendingUp className="h-3.5 w-3.5 text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
									<span className="text-xs font-mono font-medium text-gray-300">
										Active
									</span>
								</motion.div>
							)}
							
							{/* Auth Button with enhanced container */}
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.35 }}
								whileHover={{ scale: 1.02 }}
								className="relative"
							>
								<AuthButton />
							</motion.div>
						</motion.div>
					</div>
				</div>
			</motion.header>
			{/* Changelog Dialog */}
			{hasChangeLogs && (
				<DialogContent className="max-w-2xl bg-bg-2/95 backdrop-blur-xl border-white/10">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
							Platform Updates
						</DialogTitle>
						{status.globalUserMessage && (
							<DialogDescription className="text-sm text-text-secondary mt-2">
								{status.globalUserMessage}
							</DialogDescription>
						)}
					</DialogHeader>
					<ScrollArea className="max-h-[60vh] pr-4 mt-4">
						<div className="space-y-4">
							<p className="whitespace-pre-wrap text-sm leading-relaxed text-text-tertiary">
								{status.changeLogs}
							</p>
						</div>
					</ScrollArea>
				</DialogContent>
			)}
		</Dialog>
	);
}
