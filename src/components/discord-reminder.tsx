/**
 * Discord Join Reminder
 * Shows after sign-in to encourage users to join the Discord community
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/auth-context';

const STORAGE_KEY = 'discord-reminder-dismissed';
const DISCORD_URL = 'https://discord.gg/MmzPBhjpVG';

export function DiscordReminder() {
	const { isAuthenticated, user } = useAuth();
	const [isVisible, setIsVisible] = useState(false);
	const [isExiting, setIsExiting] = useState(false);

	// Check if should show reminder
	useEffect(() => {
		if (!isAuthenticated || !user) {
			setIsVisible(false);
			return;
		}

		// Don't show if user already dismissed it
		const dismissed = localStorage.getItem(STORAGE_KEY);
		if (dismissed === 'true') {
			setIsVisible(false);
			return;
		}

		// Show after a short delay (for better UX after login)
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 2000);

		return () => clearTimeout(timer);
	}, [isAuthenticated, user]);

	const handleDismiss = () => {
		setIsExiting(true);
		localStorage.setItem(STORAGE_KEY, 'true');
		setTimeout(() => {
			setIsVisible(false);
			setIsExiting(false);
		}, 300);
	};

	const handleJoinDiscord = () => {
		window.open(DISCORD_URL, '_blank', 'noopener,noreferrer');
		handleDismiss();
	};

	if (!isVisible) return null;

	return (
		<AnimatePresence>
			{!isExiting && (
				<motion.div
					initial={{ opacity: 0, y: 50, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20, scale: 0.95 }}
					transition={{ 
						type: 'spring',
						stiffness: 400,
						damping: 30
					}}
					className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
				>
					<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-blue-900/95 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
						{/* Animated background gradient */}
						<div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 animate-pulse" />
						
						{/* Close button */}
						<button
							onClick={handleDismiss}
							className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors group z-10"
							aria-label="Dismiss reminder"
						>
							<X className="h-4 w-4 text-purple-200/70 group-hover:text-purple-100 transition-colors" />
						</button>

						<div className="relative p-6 pt-5">
							{/* Icon header */}
							<div className="flex items-center gap-3 mb-4">
								<div className="relative">
									<div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full" />
									<div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30">
										<MessageCircle className="h-6 w-6 text-purple-300" />
									</div>
								</div>
								<div>
									<h3 className="text-lg font-bold text-white">
										Join Our Community!
									</h3>
									<p className="text-sm text-purple-200/80">
										Connect with other creators
									</p>
								</div>
							</div>

							{/* Content */}
							<p className="text-sm text-purple-100/90 leading-relaxed mb-5">
								Get help, share your creations, and be the first to know about new features. Our Discord community is active and welcoming! 🚀
							</p>

							{/* Perks list */}
							<div className="space-y-2 mb-5 pl-1">
								<div className="flex items-center gap-2.5 text-sm text-purple-100/80">
									<div className="h-1.5 w-1.5 rounded-full bg-purple-400/70" />
									<span>Live support from the team</span>
								</div>
								<div className="flex items-center gap-2.5 text-sm text-purple-100/80">
									<div className="h-1.5 w-1.5 rounded-full bg-blue-400/70" />
									<span>Share tips and showcase apps</span>
								</div>
								<div className="flex items-center gap-2.5 text-sm text-purple-100/80">
									<div className="h-1.5 w-1.5 rounded-full bg-indigo-400/70" />
									<span>Early access to new features</span>
								</div>
							</div>

							{/* Action buttons */}
							<div className="flex gap-3">
								<Button
									onClick={handleJoinDiscord}
									className="flex-1 h-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 border-0"
								>
									<Users className="h-4 w-4 mr-2" />
									Join Discord
								</Button>
								<Button
									onClick={handleDismiss}
									variant="ghost"
									className="px-4 h-10 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
								>
									Already Joined
								</Button>
							</div>
						</div>

						{/* Bottom accent line */}
						<div className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
