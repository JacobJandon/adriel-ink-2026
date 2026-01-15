import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, FileText, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';

export default function ContactPage() {
	return (
		<>
			<SEO 
				title="Contact Us"
				description="Get in touch with Adriel AI. We're here to help with questions, support, and feedback about our AI development platform."
				keywords="contact Adriel AI, support, customer service, help, feedback"
			/>
		<div className="container max-w-4xl mx-auto px-4 py-12 space-y-12">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center space-y-4"
			>
				<h1 className="text-4xl font-bold font-departure-mono text-text-primary">
					GET IN TOUCH
				</h1>
				<p className="text-lg text-text-secondary max-w-2xl mx-auto">
					Have questions or need help? We're here to assist you.
				</p>
			</motion.div>

			{/* Contact Methods */}
			<div className="grid md:grid-cols-2 gap-6">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.1 }}
				>
					<Card className="h-full hover:border-primary/50 transition-colors">
						<CardHeader>
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<Mail className="size-5 text-primary" />
								</div>
								<CardTitle>Email Support</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-text-secondary">
								Email support is coming soon. We're setting up our support infrastructure.
							</p>
							<Button
								variant="outline"
								className="w-full"
								disabled
							>
								<Mail className="size-4 mr-2" />
								support@adriel.ink (Coming Soon)
							</Button>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
				>
					<Card className="h-full hover:border-primary/50 transition-colors">
						<CardHeader>
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<MessageCircle className="size-5 text-primary" />
								</div>
								<CardTitle>Community</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-text-secondary">
								Join our Discord community to connect with other developers, get help, and contribute to Adriel AI's development.
							</p>
							<Button
								variant="outline"
								className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white border-0"
								asChild
							>
								<a 
									href="https://discord.gg/MmzPBhjpVG" 
									target="_blank" 
									rel="noopener noreferrer"
									className="flex items-center justify-center"
								>
									<svg className="size-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
										<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
									</svg>
									Join Discord Server
								</a>
							</Button>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
				>
					<Card className="h-full hover:border-primary/50 transition-colors">
						<CardHeader>
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<FileText className="size-5 text-primary" />
								</div>
								<CardTitle>Documentation</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-text-secondary">
								Comprehensive guides and tutorials are on the way.
							</p>
							<Button
								variant="outline"
								className="w-full"
								disabled
							>
								<FileText className="size-4 mr-2" />
								Coming Soon
							</Button>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.4 }}
				>
					<Card className="h-full hover:border-primary/50 transition-colors group">
						<CardHeader>
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
									<svg className="size-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
									</svg>
								</div>
								<CardTitle>Follow Us on X</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-text-secondary">
								Stay updated with the latest features, announcements, and community highlights.
							</p>
							<Button
								variant="outline"
								className="w-full bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/30 hover:border-blue-400/50 text-text-secondary hover:text-white transition-all"
								asChild
							>
								<a 
									href="https://x.com/adrieldotink" 
									target="_blank" 
									rel="noopener noreferrer"
									className="flex items-center justify-center"
								>
									<svg className="size-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
									</svg>
									@adrieldotink
								</a>
							</Button>
						</CardContent>
					</Card>
				</motion.div>

			</div>

			{/* Response Times */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
			>
				<Card>
					<CardHeader>
						<div className="flex items-center gap-3">
							<Clock className="size-5 text-primary" />
							<CardTitle>Expected Response Times</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex justify-between items-center pb-2 border-b border-border-primary/20">
							<span className="text-text-secondary">Free Tier</span>
							<span className="font-medium">48-72 hours</span>
						</div>
						<div className="flex justify-between items-center pb-2 border-b border-border-primary/20">
							<span className="text-text-secondary">Starter & Neural</span>
							<span className="font-medium">24-48 hours</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-text-secondary">Premium</span>
							<span className="font-medium text-primary">12-24 hours (Priority)</span>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Additional Info */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6 }}
				className="text-center space-y-4 pt-8"
			>
				<div className="p-6 rounded-lg bg-bg-4/40 border border-border-primary/20">
					<h3 className="text-lg font-semibold mb-2">Security & Privacy</h3>
					<p className="text-sm text-text-secondary">
						For security vulnerabilities, please email us at{' '}
						<a href="mailto:security@adriel.ink" className="text-primary hover:underline">
							security@adriel.ink
						</a>
						.
					</p>
				</div>
			</motion.div>
		</div>
		</>
	);
}
