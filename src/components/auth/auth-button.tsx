/**
 * Enhanced Auth Button
 * Provides OAuth + Email/Password authentication with enhanced UI
 */

import { useState } from 'react';
import { LogIn, LogOut, Settings, User, FolderKanban } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useAuth } from '../../contexts/auth-context';
import { LoginModal } from './login-modal';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuGroup,
	DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { SubscriptionStatus } from '../subscription-status';

interface AuthButtonProps {
	className?: string;
}

export function AuthButton({ className }: AuthButtonProps) {
	const {
		user,
		isAuthenticated,
		isLoading,
		error,
		login, // OAuth method
		loginWithEmail,
		register,
		logout,
		clearError,
	} = useAuth();

	const navigate = useNavigate();
	const [showLoginModal, setShowLoginModal] = useState(false);

	if (isLoading) {
		return <Skeleton className="w-10 h-10 rounded-full" />;
	}

	if (!isAuthenticated || !user) {
		return (
			<>
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setShowLoginModal(true)}
						className={clsx(
							'gap-2 h-10 px-4 rounded-xl font-medium',
							'bg-gradient-to-br from-cyan-500/10 to-blue-500/10',
							'border border-cyan-400/30 text-cyan-100',
							'hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400/50',
							'hover:shadow-lg hover:shadow-cyan-500/20',
							'transition-all duration-300',
							className
						)}
					>
						<LogIn className="h-4 w-4" />
						<span>Sign In</span>
					</Button>
				</motion.div>

				<LoginModal
					isOpen={showLoginModal}
					onClose={() => setShowLoginModal(false)}
					onLogin={(provider) => {
						// For backward compatibility with original login interface
						login(provider);
						setShowLoginModal(false);
					}}
					onEmailLogin={async (credentials) => {
						await loginWithEmail(credentials);
						if (!error) {
							setShowLoginModal(false);
						}
					}}
					onOAuthLogin={(provider) => {
						login(provider);
						setShowLoginModal(false);
					}}
					onRegister={async (data) => {
						await register(data);
						if (!error) {
							setShowLoginModal(false);
						}
					}}
					error={error}
					onClearError={clearError}
				/>
			</>
		);
	}

	// Get user initials for avatar fallback
	const getInitials = () => {
		if (user.displayName) {
			return user.displayName
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2);
		}
		return user.email.charAt(0).toUpperCase();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
					<Button
						variant="ghost"
						size="icon"
						className="relative rounded-full h-10 w-10 hover:ring-2 hover:ring-cyan-400/30 hover:bg-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
					>
						<Avatar className="h-9 w-9 ring-1 ring-white/10">
							<AvatarImage
								src={user.avatarUrl}
								alt={user.displayName || user.email}
							/>
							<AvatarFallback className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-100 font-semibold">
								{getInitials()}
							</AvatarFallback>
						</Avatar>
						{user.emailVerified && (
							<div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-bg-3 shadow-sm shadow-green-500/50" />
						)}
					</Button>
				</motion.div>
			</DropdownMenuTrigger>

			<AnimatePresence>
				<DropdownMenuContent align="end" className="w-72 bg-bg-2/95 backdrop-blur-xl border-white/10" asChild>
					<motion.div
						initial={{ opacity: 0, y: -10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.95 }}
						transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
					>
						<DropdownMenuLabel className="p-0">
							<div className="flex items-start gap-3 p-4 border-b border-white/10">
								<Avatar className="h-12 w-12 ring-2 ring-cyan-400/20">
									<AvatarImage
										src={user.avatarUrl}
										alt={user.displayName || user.email}
									/>
									<AvatarFallback className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-100 font-semibold text-lg">
										{getInitials()}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col gap-1 flex-1 text-text-primary">
									<div className="flex items-center gap-2">
										<span className="text-sm font-semibold">
											{user.displayName || 'User'}
										</span>
									</div>
									<span className="text-xs text-text-tertiary">
										{user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>

						<DropdownMenuSeparator />

						{/* Subscription Badge */}
						<div className="px-2 py-2">
							<SubscriptionStatus compact />
						</div>

					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={() => navigate('/profile')}
							className="cursor-pointer"
						>
							<User className="mr-1 h-4 w-4" />
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => navigate('/apps')}
							className="cursor-pointer"
						>
							<FolderKanban className="mr-1 h-4 w-4" />
							My Apps
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => navigate('/settings')}
							className="cursor-pointer"
						>
							<Settings className="mr-1 h-4 w-4" />
							Settings
						</DropdownMenuItem>
					</DropdownMenuGroup>

					<DropdownMenuItem
						onClick={() => logout()}
						className="cursor-pointer text-destructive focus:text-text-primary"
					>
						<LogOut className="mr-1 h-4 w-4" />
						Sign Out
					</DropdownMenuItem>
					</motion.div>
				</DropdownMenuContent>
			</AnimatePresence>
		</DropdownMenu>
	);
}
