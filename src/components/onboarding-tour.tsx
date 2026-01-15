/**
 * Interactive Onboarding Tour
 * Guides new users through the platform with step-by-step instructions
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, MessageSquare, Settings, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

const ONBOARDING_KEY = 'adriel-onboarding-completed';

interface Step {
	title: string;
	description: string;
	icon: React.ReactNode;
	tip?: string;
	action?: {
		label: string;
		onClick: () => void;
	};
}

export function OnboardingTour() {
	const [currentStep, setCurrentStep] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	const steps: Step[] = [
		{
			title: '👋 Welcome to Adriel AI!',
			description: 'Build full-stack apps instantly with just a conversation. Let me show you around!',
			icon: <Sparkles className="h-8 w-8 text-cyan-400" />,
		},
		{
			title: '💬 Start with a Prompt',
			description: 'Just describe what you want to build. Try something like "Create a todo app with dark mode" or "Build a landing page for my startup".',
			icon: <MessageSquare className="h-8 w-8 text-purple-400" />,
			tip: 'The more specific your prompt, the better the result!',
			action: {
				label: 'Try an Example',
				onClick: () => {
					const input = document.querySelector('textarea') as HTMLTextAreaElement;
					if (input) {
						input.value = 'Create a modern todo app with dark mode and animations';
						input.focus();
					}
				},
			},
		},
		{
			title: '⚡ AI Builds in Real-Time',
			description: 'Watch as AI writes the code, creates components, and builds your app live. You can chat with it to refine and improve.',
			icon: <Zap className="h-8 w-8 text-yellow-400" />,
			tip: 'Ask for changes like "make it more colorful" or "add a login page"',
		},
		{
			title: '🎨 Customize Everything',
			description: 'Change AI models, adjust settings, and even use your own API keys. Access settings anytime from the sidebar.',
			icon: <Settings className="h-8 w-8 text-blue-400" />,
		},
		{
			title: '🚀 Export to GitHub',
			description: 'When you\'re happy with your app, export it directly to a GitHub repository. Deploy it anywhere!',
			icon: <CheckCircle2 className="h-8 w-8 text-green-400" />,
		},
	];

	useEffect(() => {
		// Check if user has completed onboarding
		const completed = localStorage.getItem(ONBOARDING_KEY);
		
		// Show onboarding to new users after a short delay
		if (!completed) {
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, []);

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			handleComplete();
		}
	};

	const handleSkip = () => {
		handleComplete();
	};

	const handleComplete = () => {
		localStorage.setItem(ONBOARDING_KEY, 'true');
		setIsVisible(false);
	};

	if (!isVisible) return null;

	const step = steps[currentStep];
	const isLastStep = currentStep === steps.length - 1;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
				onClick={handleSkip}
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
					transition={{ type: 'spring', duration: 0.5 }}
					onClick={(e) => e.stopPropagation()}
					className="relative w-full max-w-2xl mx-4"
				>
					{/* Card */}
					<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
						{/* Animated background */}
						<div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-purple-600/5 to-pink-600/5 animate-pulse" />
						
						{/* Close button */}
						<button
							onClick={handleSkip}
							className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 transition-colors z-10"
							aria-label="Skip tour"
						>
							<X className="h-5 w-5 text-white/70 hover:text-white" />
						</button>

						<div className="relative p-8 sm:p-12">
							{/* Step indicator */}
							<div className="flex items-center justify-center gap-2 mb-8">
								{steps.map((_, index) => (
									<div
										key={index}
										className={`h-1.5 rounded-full transition-all duration-300 ${
											index === currentStep
												? 'w-8 bg-gradient-to-r from-cyan-400 to-purple-400'
												: index < currentStep
													? 'w-1.5 bg-green-400'
													: 'w-1.5 bg-white/20'
										}`}
									/>
								))}
							</div>

							{/* Icon */}
							<motion.div
								key={currentStep}
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								transition={{ type: 'spring', duration: 0.6 }}
								className="flex justify-center mb-6"
							>
								<div className="relative">
									<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl rounded-full" />
									<div className="relative p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
										{step.icon}
									</div>
								</div>
							</motion.div>

							{/* Content */}
							<motion.div
								key={currentStep}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="text-center space-y-4"
							>
								<h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
									{step.title}
								</h2>
								<p className="text-lg text-white/80 leading-relaxed max-w-xl mx-auto">
									{step.description}
								</p>
								
								{step.tip && (
									<div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
										<Sparkles className="h-4 w-4 text-yellow-400" />
										<span className="text-sm text-yellow-200">{step.tip}</span>
									</div>
								)}
							</motion.div>

							{/* Actions */}
							<div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
								{!isLastStep && (
									<Button
										onClick={handleSkip}
										variant="ghost"
										className="text-white/60 hover:text-white hover:bg-white/10"
									>
										Skip Tour
									</Button>
								)}
								
								{step.action && (
									<Button
										onClick={step.action.onClick}
										variant="outline"
										className="border-cyan-400/30 hover:border-cyan-400/50 hover:bg-cyan-400/10 text-cyan-200"
									>
										{step.action.label}
									</Button>
								)}
								
								<Button
									onClick={handleNext}
									className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-purple-500/30 px-8"
								>
									{isLastStep ? (
										<>
											<CheckCircle2 className="h-5 w-5 mr-2" />
											Get Started
										</>
									) : (
										<>
											Next
											<ArrowRight className="h-5 w-5 ml-2" />
										</>
									)}
								</Button>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
