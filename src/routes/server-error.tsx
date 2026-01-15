import { Link, useSearchParams } from 'react-router';
import { motion } from 'framer-motion';
import { Home, RefreshCw, MessagesSquare, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useEffect, useState } from 'react';

export default function ServerError() {
	const [searchParams] = useSearchParams();
	const [errorId, setErrorId] = useState<string>('');
	
	// Try to get error ID from URL params or generate one
	useEffect(() => {
		const urlErrorId = searchParams.get('errorId');
		if (urlErrorId) {
			setErrorId(urlErrorId);
		} else {
			// Generate error ID for tracking
			setErrorId(`ERR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`);
		}
	}, [searchParams]);
	
	const aiMessages = [
		"Oops! My circuits got a bit tangled... 🤖",
		"Even AI needs a coffee break sometimes ☕",
		"Error 500: I promise I was trained better than this! 🎓",
		"My neural networks are taking a quick nap 😴",
		"Something went wrong in the matrix... 🔮",
	];

	const randomMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)];

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50/50 via-orange-50/30 to-yellow-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center max-w-2xl w-full"
			>
				{/* 500 Number with Glitch Effect */}
				<motion.div
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
					className="mb-8"
				>
					<h1 className="text-9xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
						500
					</h1>
				</motion.div>

				{/* AI Message */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="space-y-4 mb-8"
				>
					<div className="flex items-center justify-center gap-3 mb-4">
						<AlertTriangle className="size-8 text-orange-500" />
					</div>
					<h2 className="text-3xl font-bold text-text-primary">
						Server Error
					</h2>
					<Card className="bg-orange-500/5 border-orange-500/20">
						<CardContent className="p-4">
							<p className="text-lg text-text-primary font-medium">
								{randomMessage}
							</p>
						</CardContent>
					</Card>
					<p className="text-text-secondary">
						Our servers are experiencing issues. This is on us, not you! Please try again in a few moments.
					</p>
				</motion.div>

				{/* What You Can Do */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="mb-8"
				>
					<Card>
						<CardContent className="p-6">
							<h3 className="font-semibold text-text-primary mb-4">What you can try:</h3>
							<ul className="text-left text-text-secondary space-y-2 text-sm">
								<li className="flex items-center gap-2">
									<div className="size-1.5 rounded-full bg-primary" />
									<span>Refresh the page in a few moments</span>
								</li>
								<li className="flex items-center gap-2">
									<div className="size-1.5 rounded-full bg-primary" />
									<span>Clear your browser cache and try again</span>
								</li>
								<li className="flex items-center gap-2">
									<div className="size-1.5 rounded-full bg-primary" />
									<span>Check our <a href="/status" className="text-primary hover:underline">status page</a> for known issues</span>
								</li>
								<li className="flex items-center gap-2">
									<div className="size-1.5 rounded-full bg-primary" />
									<span>If the problem persists, contact our support team</span>
								</li>
							</ul>
						</CardContent>
					</Card>
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="flex flex-col sm:flex-row gap-4 justify-center items-center"
				>
					<Button
						onClick={() => window.location.reload()}
						className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
					>
						<RefreshCw className="size-4" />
						Refresh Page
					</Button>
					<Link to="/">
						<Button variant="outline" className="inline-flex items-center gap-2">
							<Home className="size-4" />
							Go Home
						</Button>
					</Link>
					<Link to="/contact">
						<Button variant="outline" className="inline-flex items-center gap-2">
							<MessagesSquare className="size-4" />
							Contact Support
						</Button>
					</Link>
				</motion.div>

				{/* Error ID (for support) */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="mt-8"
				>
					<Card className="bg-gray-100 dark:bg-gray-800/50">
						<CardContent className="p-4">
							<p className="text-xs text-text-secondary mb-1">Error Reference ID:</p>
							<p className="text-sm font-mono text-text-primary">{errorId}</p>
							<p className="text-xs text-text-secondary mt-2">Include this ID when contacting support for faster assistance</p>
						</CardContent>
					</Card>
				</motion.div>

				{/* Decorative Element */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.05 }}
					transition={{ delay: 0.7 }}
					className="mt-12 text-orange-500"
				>
					<svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200" fill="currentColor">
						<path d="M100 20 L180 180 L20 180 Z" opacity="0.1" />
						<circle cx="100" cy="120" r="8" />
						<rect x="95" y="70" width="10" height="40" rx="2" />
					</svg>
				</motion.div>
			</motion.div>
		</div>
	);
}
