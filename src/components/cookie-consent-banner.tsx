import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieConsentBanner() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Check if user has already made a choice
		const consent = localStorage.getItem('cookie-consent');
		if (!consent) {
			// Show banner after a short delay for better UX
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem('cookie-consent', 'accepted');
		setIsVisible(false);
	};

	const handleDecline = () => {
		localStorage.setItem('cookie-consent', 'declined');
		setIsVisible(false);
		// Clear any existing auth cookies
		document.cookie.split(';').forEach((c) => {
			document.cookie = c
				.replace(/^ +/, '')
				.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
		});
		// Optionally redirect to logout or show a message
		console.log('Cookies declined - auth cookies cleared');
	};

	const handleClose = () => {
		// Treat close as decline
		handleDecline();
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ type: 'spring', damping: 25, stiffness: 300 }}
					className="fixed bottom-0 left-0 right-0 z-[10000] p-4 md:p-6"
				>
					<div className="max-w-6xl mx-auto">
						<div className="relative bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-6 md:p-8">
							{/* Close button */}
							<button
								onClick={handleClose}
								className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent/50 transition-colors"
								aria-label="Close cookie banner"
							>
								<X className="w-5 h-5 text-text-secondary" />
							</button>

							{/* Content */}
							<div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
								{/* Icon */}
								<div className="flex-shrink-0">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
										<Cookie className="w-6 h-6 text-amber-500" />
									</div>
								</div>

								{/* Text content */}
								<div className="flex-1 space-y-2">
									<h3 className="text-lg font-semibold text-text-primary font-departure-mono">
										🍪 We Use Cookies
									</h3>
									<p className="text-sm text-text-secondary leading-relaxed">
										We use <strong>essential cookies</strong> to keep you logged in and ensure the platform works properly. 
										We <strong>do not use tracking or advertising cookies</strong>. By accepting, you allow us to use 
									HTTP-only secure cookies for authentication and session management.
									{' '}
									<a 
										href="/privacy" 
										className="text-accent hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										Learn more in our Privacy Policy
										</a>
									</p>
								</div>

								{/* Actions */}
								<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
									<Button
										onClick={handleDecline}
										variant="outline"
										className="w-full sm:w-auto px-6"
									>
										Decline
									</Button>
									<Button
										onClick={handleAccept}
										className="w-full sm:w-auto px-6 bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-500/90"
									>
										Accept Cookies
									</Button>
								</div>
							</div>

							{/* Additional info */}
							<div className="mt-4 pt-4 border-t border-border/50">
								<div className="flex flex-wrap gap-4 text-xs text-text-tertiary">
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 rounded-full bg-green-500"></div>
										<span>Essential cookies only</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 rounded-full bg-green-500"></div>
										<span>No tracking</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 rounded-full bg-green-500"></div>
										<span>No third-party cookies</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 rounded-full bg-green-500"></div>
										<span>GDPR compliant</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
