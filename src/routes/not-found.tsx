import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Compass } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function NotFound() {
	const aiSuggestions = [
		"Even my AI couldn't find that page! 🤖",
		"404: This page is hiding better than my training data! 🔍",
		"Looks like this URL took a wrong turn in the neural network 🧠",
		"Page not found... but at least you found this cool 404 page! ✨",
		"My algorithms searched everywhere, but this page doesn't exist 🎯",
	];

	const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-cyan-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center max-w-2xl w-full"
			>
				{/* 404 Number */}
				<motion.div
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
					className="mb-8"
				>
					<h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
						404
					</h1>
				</motion.div>

				{/* AI Message */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="space-y-4 mb-8"
				>
					<h2 className="text-3xl font-bold text-text-primary">
						Page Not Found
					</h2>
					<Card className="bg-primary/5 border-primary/20">
						<CardContent className="p-4">
							<p className="text-lg text-text-primary font-medium">
								{randomSuggestion}
							</p>
						</CardContent>
					</Card>
					<p className="text-text-secondary">
						The page you're looking for doesn't exist or has been moved.
					</p>
				</motion.div>

				{/* Quick Links */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="mb-8"
				>
					<Card>
						<CardContent className="p-6">
							<h3 className="font-semibold text-text-primary mb-4">Maybe you were looking for:</h3>
							<div className="grid grid-cols-2 gap-3 text-sm">
								<Link to="/" className="text-primary hover:underline text-left">
									→ Home
								</Link>
								<Link to="/discover" className="text-primary hover:underline text-left">
									→ Discover Apps
								</Link>
								<Link to="/pricing" className="text-primary hover:underline text-left">
									→ Pricing
								</Link>
								<Link to="/about" className="text-primary hover:underline text-left">
									→ About Us
								</Link>
								<Link to="/contact" className="text-primary hover:underline text-left">
									→ Contact Support
								</Link>
								<Link to="/status" className="text-primary hover:underline text-left">
									→ System Status
								</Link>
							</div>
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
					<Link to="/">
						<Button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
							<Home className="size-4" />
							Go Home
						</Button>
					</Link>
					<Button
						onClick={() => window.history.back()}
						variant="outline"
						className="inline-flex items-center gap-2"
					>
						<ArrowLeft className="size-4" />
						Go Back
					</Button>
					<Link to="/discover">
						<Button variant="outline" className="inline-flex items-center gap-2">
							<Compass className="size-4" />
							Explore Apps
						</Button>
					</Link>
				</motion.div>

				{/* Decorative Element */}
				<motion.div
					initial={{ opacity: 0, rotate: 0 }}
					animate={{ opacity: 0.05, rotate: 360 }}
					transition={{ delay: 0.6, duration: 20, repeat: Infinity, ease: "linear" }}
					className="mt-16 text-primary"
				>
					<Search className="w-32 h-32 mx-auto" />
				</motion.div>
			</motion.div>
		</div>
	);
}
