import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Target, Zap, Shield, Heart, Vote, Github, Youtube, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';

export default function AboutPage() {
	return (
		<>
			<SEO 
				title="About"
				description="Learn about Adriel AI - the open-source, democratic AI development platform. Build, deploy, and iterate on full-stack apps with instant Cloudflare deployments. Vote on features, contribute code, and help shape the future."
				keywords="about Adriel AI, open source AI platform, democratic development, community-driven, AI development platform, full-stack AI builder, Cloudflare edge deployment, developer tools, GitHub open source"
			/>
		<div className="container max-w-5xl mx-auto px-4 py-12 space-y-16">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center space-y-6"
			>
				<div className="flex justify-center">
					<img 
						src="/assets/adriel-icon.png" 
						alt="Adriel AI" 
						className="size-24 rounded-2xl"
					/>
				</div>
				<h1 className="text-4xl font-bold font-departure-mono text-text-primary">
					ABOUT ADRIEL AI
				</h1>
				<p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
					<strong className="text-text-primary">The open-source, democratic AI development platform</strong> that goes beyond coding assistance.
					Build, deploy, and iterate on full-stack apps with conversational AI, instant Cloudflare deployments, 
					and a <strong className="text-accent">community-driven</strong> approach where <strong className="text-green-400">you decide what we build next</strong>.
				</p>
				<div className="flex items-center justify-center gap-4 flex-wrap mt-4">
					<Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 px-4 py-1.5">
						<Heart className="size-3 mr-1.5" />
						Open Source
					</Badge>
					<Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 px-4 py-1.5">
						<Users className="size-3 mr-1.5" />
						Community-Driven
					</Badge>
					<Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 px-4 py-1.5">
						<Vote className="size-3 mr-1.5" />
						Democratic Development
					</Badge>
				</div>
			</motion.div>

			{/* What Makes Us Different */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="space-y-6"
			>
				<div className="text-center">
					<Badge variant="outline" className="mb-4 bg-accent/10 text-accent border-accent/30">
						<Sparkles className="size-3 mr-1" />
						What Makes Us Different
					</Badge>
					<h2 className="text-3xl font-bold mb-6">The Complete AI Development Platform</h2>
					<div className="max-w-4xl mx-auto space-y-4 text-left">
						<div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
							<h3 className="text-xl font-semibold mb-2 text-accent">🚀 End-to-End Development Workflow</h3>
							<p className="text-text-secondary">
								Adriel AI handles the <strong>entire development lifecycle</strong>: from natural language prompts to 
								deployed apps on Cloudflare Workers. No switching contexts, no manual deployments—just 
								<strong className="text-accent"> seamless, intelligent development</strong>.
							</p>
						</div>
						<div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
							<h3 className="text-xl font-semibold mb-2 text-blue-400">💎 Premium Features, Accessible Pricing</h3>
							<p className="text-text-secondary">
								We offer <strong className="text-accent">enterprise-grade features at accessible prices</strong> ($7.99/mo starter), 
								with annual plans that save you even more. Premium AI development without the premium price tag.
							</p>
						</div>
						<div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
							<h3 className="text-xl font-semibold mb-2 text-green-400">🌍 Open Source & Transparent</h3>
							<p className="text-text-secondary">
								<strong className="text-green-400">100% open source</strong> on GitHub. Inspect our code, 
								contribute improvements, report issues, and help shape the future. 
								<strong className="text-accent"> Transparency isn't optional—it's our foundation</strong>.
							</p>
						</div>
						<div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
							<h3 className="text-xl font-semibold mb-2 text-purple-400">🗳️ Democratic Development</h3>
							<p className="text-text-secondary">
								<strong className="text-purple-400">You decide what we build</strong>. Vote on features via Discord polls, 
								propose new ideas through GitHub discussions, and watch your suggestions come to life. 
								<strong className="text-accent"> Your voice directly shapes our roadmap</strong>.
							</p>
						</div>
						<div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
							<h3 className="text-xl font-semibold mb-2 text-purple-400">⚡ Instant Global Deployments</h3>
							<p className="text-text-secondary">
								Deployed on <strong>Cloudflare's edge network</strong> in 300+ cities worldwide. 
								Your apps go live in seconds, not minutes. No Docker containers, no cold starts, 
								no infrastructure headaches. Just <strong className="text-accent">instant, global scale</strong>.
							</p>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Mission */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="space-y-6"
			>
				<div className="text-center">
					<Badge variant="outline" className="mb-4">
						<Target className="size-3 mr-1" />
						Our Mission
					</Badge>
					<h2 className="text-3xl font-bold mb-4">Build the Future of AI-Native Development</h2>
					<p className="text-lg text-text-secondary max-w-3xl mx-auto">
						We're not trying to replace developers—we're <strong className="text-text-primary">amplifying their capabilities</strong>. 
						Adriel AI lets you focus on <strong className="text-accent">ideas and creativity</strong> while handling 
						the tedious parts: boilerplate, deployments, configurations, and repetitive coding tasks.
					</p>
				</div>
			</motion.div>

			{/* Core Values */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="grid md:grid-cols-2 gap-6"
			>
				<Card className="border-primary/20">
					<CardHeader>
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-primary/10">
								<Zap className="size-6 text-primary" />
							</div>
							<CardTitle>Speed & Innovation</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="text-text-secondary">
						We move fast and iterate constantly. Using the latest AI models and 
						technologies, we enable rapid prototyping and deployment.
					</CardContent>
				</Card>

				<Card className="border-primary/20">
					<CardHeader>
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-primary/10">
								<Shield className="size-6 text-primary" />
							</div>
							<CardTitle>Security & Privacy</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="text-text-secondary">
						Your code and data are yours. We implement industry-standard security 
						practices and never train models on your private projects.
					</CardContent>
				</Card>

				<Card className="border-primary/20">
					<CardHeader>
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-primary/10">
								<Target className="size-6 text-primary" />
							</div>
							<CardTitle>Quality & Precision</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="text-text-secondary">
						Every feature is crafted with care. From intelligent error correction 
						to beautiful UI components, quality is our top priority.
					</CardContent>
				</Card>

				<Card className="border-primary/20">
					<CardHeader>
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-primary/10">
								<Heart className="size-6 text-primary" />
							</div>
							<CardTitle>Community First</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="text-text-secondary">
						Built by developers, for developers. We listen to feedback and 
						continuously improve based on what our community needs.
					</CardContent>
				</Card>
			</motion.div>

			{/* Technology Stack */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				<Card>
					<CardHeader>
						<div className="text-center space-y-2">
							<Badge variant="outline" className="mb-2">
								<Zap className="size-3 mr-1" />
								Tech Stack
							</Badge>
							<CardTitle className="text-2xl">Built on Modern Infrastructure</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid md:grid-cols-3 gap-4 text-center">
							<div className="p-4 rounded-lg bg-bg-4/40 border border-border-primary/20">
								<h4 className="font-semibold mb-2 text-primary">Frontend</h4>
								<p className="text-sm text-text-secondary">
									React 19, TypeScript, Vite, Tailwind CSS 4
								</p>
							</div>
							<div className="p-4 rounded-lg bg-bg-4/40 border border-border-primary/20">
								<h4 className="font-semibold mb-2 text-primary">Backend</h4>
								<p className="text-sm text-text-secondary">
									Cloudflare Workers, Hono, D1, R2, Durable Objects
								</p>
							</div>
							<div className="p-4 rounded-lg bg-bg-4/40 border border-border-primary/20">
								<h4 className="font-semibold mb-2 text-primary">AI Models</h4>
								<p className="text-sm text-text-secondary">
									OpenAI, Anthropic, Google Gemini, Cerebras
								</p>
							</div>
						</div>
						<div className="text-center text-sm text-text-secondary">
							<p>
								Powered with{' '}
								<span className="text-primary font-medium">Cloudflare</span> infrastructure 
								for global edge deployment and lightning-fast performance.
							</p>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Community Driven */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className="text-center space-y-6"
			>
				<div className="p-8 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
					<div className="flex items-center justify-center gap-3 mb-4">
						<Heart className="size-12 text-green-400" />
						<Vote className="size-12 text-purple-400" />
						<Github className="size-12 text-blue-400" />
					</div>
					<h3 className="text-2xl font-bold mb-3">Open-Source, Democratic Development</h3>
					<p className="text-text-secondary max-w-2xl mx-auto mb-4">
						We believe in <strong className="text-green-400">building in the open</strong>. 
						Adriel AI is <strong className="text-accent">100% open-source on GitHub</strong>—inspect our code, 
						contribute features, and help us improve. We're <strong className="text-purple-400">open to all developers</strong> who 
						want to shape the future of AI development.
					</p>
					<p className="text-lg text-text-secondary max-w-2xl mx-auto mb-4 font-semibold">
						🗳️ <strong className="text-purple-400">Democratic Decision-Making</strong>: 
						Vote on features, propose ideas, and influence our roadmap. 
						<strong className="text-accent"> Your feedback becomes our priorities</strong>.
					</p>
					<p className="text-sm text-text-tertiary max-w-2xl mx-auto mb-6">
						Our focus is on delivering a <strong className="text-accent">premium development experience</strong> that's 
						both powerful and accessible. We maintain <strong className="text-green-400">fair usage limits</strong> to keep 
						the platform sustainable while providing generous free and paid tiers. Join our community to help decide 
						what features, models, and improvements we build next.
					</p>
					<div className="flex gap-4 justify-center flex-wrap">
						<a
							href="https://github.com/JacobJandon/adriel-ink"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors font-medium"
						>
							<Github className="size-5" />
							View on GitHub
						</a>
						<a
							href="https://discord.gg/MmzPBhjpVG"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors font-medium"
						>
							<svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
								<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
							</svg>
							Join Discord
						</a>
						<a
							href="https://www.youtube.com/@adrieldotink"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
						>
							<Youtube className="size-5" />
							Watch Updates
						</a>
					</div>
				</div>
			</motion.div>

			{/* Contact CTA */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
				className="text-center py-8"
			>
				<h3 className="text-xl font-semibold mb-3">Want to Learn More?</h3>
				<p className="text-text-secondary mb-6">
					Get in touch with us for partnerships, enterprise solutions, or just to say hello.
				</p>
				<a
					href="/contact"
					className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
				>
					Contact Us
				</a>
			</motion.div>
		</div>
		</>
	);
}
