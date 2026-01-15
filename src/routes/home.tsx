import { useRef, useState, useEffect, useMemo } from 'react';
import { ArrowRight, Info, Loader } from 'react-feather';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '@/contexts/auth-context';
import { SEO } from '@/components/SEO';
import {
	AgentModeToggle,
	type AgentMode,
} from '../components/agent-mode-toggle';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { usePaginatedApps } from '@/hooks/use-paginated-apps';
import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from 'framer-motion';
import { AppCard } from '@/components/shared/AppCard';
import clsx from 'clsx';
import { useImageUpload } from '@/hooks/use-image-upload';
import { useDragDrop } from '@/hooks/use-drag-drop';
import { ImageUploadButton } from '@/components/image-upload-button';
import { ImageAttachmentPreview } from '@/components/image-attachment-preview';
import { SUPPORTED_IMAGE_MIME_TYPES } from '@/api-types';
import { MobileBlocker } from '@/components/mobile-blocker';
import { AdrielLogoFull } from '@/components/layout/adriel-logo';
import { TermsAcceptanceDialog } from '@/components/terms-acceptance-dialog';
import { OnboardingTour } from '@/components/onboarding-tour';
import { toast } from 'sonner';

export default function Home() {
	const navigate = useNavigate();
	const location = useLocation();
	const { requireAuth } = useAuthGuard();
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [agentMode, setAgentMode] = useState<AgentMode>('deterministic');
	const [query, setQuery] = useState('');
	const { user } = useAuth();
	const isLoggedIn = !!user;
	const [showMobileBlocker, setShowMobileBlocker] = useState(false);
	const [showTermsDialog, setShowTermsDialog] = useState(false);
	const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

	// Handle initial prompt from navigation state (e.g., from empty state examples)
	useEffect(() => {
		if (location.state?.initialPrompt) {
			setQuery(location.state.initialPrompt);
			if (textareaRef.current) {
				textareaRef.current.focus();
			}
			// Clear state to prevent repopulation on future navigations
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [location.state, location.pathname, navigate]);

	// Check if user has accepted terms
	useEffect(() => {
		if (isLoggedIn) {
			const termsAccepted = localStorage.getItem('adriel-terms-accepted');
			if (!termsAccepted) {
				setShowTermsDialog(true);
			}
		}
	}, [isLoggedIn]);

	const handleTermsAccept = () => {
		localStorage.setItem('adriel-terms-accepted', 'true');
		setShowTermsDialog(false);
		
		// Navigate to pending URL if any
		if (pendingNavigation) {
			navigate(pendingNavigation);
			setPendingNavigation(null);
			clearImages();
		}
	};

	// Check if mobile blocker should be shown
	useEffect(() => {
		const dismissed = localStorage.getItem('mobile-blocker-dismissed');
		const isMobile = window.innerWidth < 1024;
		setShowMobileBlocker(isMobile && !dismissed);
	}, []);

	const { images, addImages, removeImage, clearImages, isProcessing } = useImageUpload({
		onError: (error: unknown) => {
			console.error('Image upload error:', error);
			toast.error('🖼️ Image upload failed', {
				description: 'Try a smaller image (max 5MB) or a different format.',
			});
		},
	});

	const { isDragging, dragHandlers } = useDragDrop({
		onFilesDropped: addImages,
		accept: [...SUPPORTED_IMAGE_MIME_TYPES],
	});


	const placeholderPhrases = useMemo(() => {
		const phrases = [
			"todo list app",
			"personal fitness tracker",
			"recipe manager",
			"budget calculator",
			"habit tracker",
			"password manager",
			"weather dashboard",
			"movie watchlist",
			"book reading tracker",
			"expense tracker",
			"pomodoro timer",
			"note-taking app",
			"meditation timer",
			"workout planner",
			"meal prep planner",
			"daily journal",
			"goal tracker",
			"language learning app",
			"music playlist manager",
			"travel planner",
			"crypto portfolio tracker",
			"calorie counter",
			"water intake tracker",
			"sleep tracker",
			"mood tracker",
			"investment calculator",
			"quiz game",
			"flashcard app",
			"shopping list",
			"gift idea tracker",
			"countdown timer",
			"URL shortener",
			"color palette generator",
			"markdown editor",
			"code snippet manager",
			"meme generator",
			"random quote generator",
			"QR code generator",
			"unit converter",
			"tax calculator"
		];
		// Shuffle array for randomization
		return phrases.sort(() => Math.random() - 0.5);
	}, []);
	const [currentPlaceholderPhraseIndex, setCurrentPlaceholderPhraseIndex] = useState(0);
	const [currentPlaceholderText, setCurrentPlaceholderText] = useState("");
	const [isPlaceholderTyping, setIsPlaceholderTyping] = useState(true);
	const [isCreating, setIsCreating] = useState(() => {
		// Check if app creation is in progress from previous session
		return sessionStorage.getItem('adriel-app-creation-in-progress') === 'true';
	});

	const {
		apps,
		loading,
	} = usePaginatedApps({
		type: 'public',
		defaultSort: 'popular',
		defaultPeriod: 'week',
		limit: 6,
	});

	// Discover section should appear only when enough apps are available and loading is done
	const discoverReady = useMemo(() => !loading && (apps?.length ?? 0) > 5, [loading, apps]);

	// Safety timeout to clear stuck "isCreating" state (30 seconds)
	useEffect(() => {
		if (isCreating) {
			const timeout = setTimeout(() => {
				console.warn('⚠️ App creation timeout - resetting isCreating flag');
				sessionStorage.removeItem('adriel-app-creation-in-progress');
				setIsCreating(false);
			}, 30000); // 30 seconds
			
			return () => clearTimeout(timeout);
		}
	}, [isCreating]);

	const handleCreateApp = (query: string, mode: AgentMode) => {
		// Prevent duplicate submissions
		if (isCreating) {
			console.warn('⚠️ App creation already in progress, ignoring duplicate request');
			return;
		}
		
		// Persist flag to survive navigation
		sessionStorage.setItem('adriel-app-creation-in-progress', 'true');
		setIsCreating(true);
		
		const encodedQuery = encodeURIComponent(query);
		const encodedMode = encodeURIComponent(mode);
		
		// Encode images as JSON if present
		const imageParam = images.length > 0 ? `&images=${encodeURIComponent(JSON.stringify(images))}` : '';
		const intendedUrl = `/chat/new?query=${encodedQuery}&agentMode=${encodedMode}${imageParam}`;

		if (
			!requireAuth({
				requireFullAuth: true,
				actionContext: 'to create applications',
				intendedUrl: intendedUrl,
			})
		) {
			// Clear flag if auth fails
			sessionStorage.removeItem('adriel-app-creation-in-progress');
			setIsCreating(false);
			return;
		}

		// Check if terms have been accepted
		const termsAccepted = localStorage.getItem('adriel-terms-accepted');
		if (!termsAccepted) {
			setPendingNavigation(intendedUrl);
			setShowTermsDialog(true);
			// Clear flag if terms not accepted
			sessionStorage.removeItem('adriel-app-creation-in-progress');
			setIsCreating(false);
			return;
		}

		// User is already authenticated and terms accepted, navigate immediately
		console.log('✅ Navigating to create new app:', { query, mode, hasImages: images.length > 0 });
		
		// Show informational toast about generation time
		toast.info('⚡ Starting app generation', {
			description: 'This can take 7-20 minutes to complete. Feel free to explore while we build!',
			duration: 8000,
		});
		
		navigate(intendedUrl);
		// Clear images after navigation
		clearImages();
		// Note: isCreating will be reset when component unmounts on navigation
	};

	// Auto-resize textarea based on content
	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			const scrollHeight = textareaRef.current.scrollHeight;
			const maxHeight = 300; // Maximum height in pixels
			textareaRef.current.style.height =
				Math.min(scrollHeight, maxHeight) + 'px';
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	}, []);

	// Typewriter effect
	useEffect(() => {
		const currentPhrase = placeholderPhrases[currentPlaceholderPhraseIndex];

		if (isPlaceholderTyping) {
			if (currentPlaceholderText.length < currentPhrase.length) {
				const timeout = setTimeout(() => {
					setCurrentPlaceholderText(currentPhrase.slice(0, currentPlaceholderText.length + 1));
				}, 100); // Typing speed
				return () => clearTimeout(timeout);
			} else {
				// Pause before erasing
				const timeout = setTimeout(() => {
					setIsPlaceholderTyping(false);
				}, 2000); // Pause duration
				return () => clearTimeout(timeout);
			}
		} else {
			if (currentPlaceholderText.length > 0) {
				const timeout = setTimeout(() => {
					setCurrentPlaceholderText(currentPlaceholderText.slice(0, -1));
				}, 50); // Erasing speed
				return () => clearTimeout(timeout);
			} else {
				// Move to next phrase
				setCurrentPlaceholderPhraseIndex((prev) => (prev + 1) % placeholderPhrases.length);
				setIsPlaceholderTyping(true);
			}
		}
	}, [currentPlaceholderText, currentPlaceholderPhraseIndex, isPlaceholderTyping, placeholderPhrases]);

	const discoverLinkRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<SEO 
				title="Home"
				description="Welcome to Adriel AI - Build, deploy, and iterate on full-stack apps with conversational AI and instant Cloudflare deployments."
			/>
			
			{/* Onboarding Tour */}
			<OnboardingTour />
			
		<div className="relative flex flex-col items-center size-full">

			{/* Mobile Blocker */}
			{showMobileBlocker && (
				<div id="mobile-blocker">
					<MobileBlocker />
				</div>
			)}
			
			{/* Dotted background pattern - extends to full viewport */}
			<div className="fixed inset-0 text-accent z-0 opacity-20 pointer-events-none">
				<svg width="100%" height="100%">
					<defs>
						<pattern
							id=":S2:"
							viewBox="-6 -6 12 12"
							patternUnits="userSpaceOnUse"
							width="12"
							height="12"
						>
							<circle
								cx="0"
								cy="0"
								r="1"
								fill="currentColor"
							></circle>
						</pattern>
					</defs>
					<rect
						width="100%"
						height="100%"
						fill="url(#:S2:)"
					></rect>
				</svg>
			</div>
			
			<LayoutGroup>
				<div className="rounded-[1.25rem] w-full max-w-2xl overflow-hidden relative">
					{/* Animated background layers (visual only) */}
					<div className="absolute inset-0 bg-animated-mesh opacity-60 pointer-events-none" />
					<div className="absolute inset-0 bg-radial-vignette opacity-70 mix-blend-plus-lighter pointer-events-none" />
					<motion.div
						layout
						transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
						className={clsx(
							"px-6 p-8 flex flex-col items-center z-10",
							discoverReady ? "mt-8" : "mt-4 sm:mt-6 md:mt-8"
						)}>
						{/* Decorative background glow */}
						<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
						
						{/* Logo with animation */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8, y: -20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							transition={{ 
								duration: 0.9, 
								ease: [0.16, 1, 0.3, 1],
								delay: 0.1
							}}
							className="mb-5"
						>
							<motion.div
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.3 }}
								className="relative"
							>
								{/* Glow effect behind logo */}
								<div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-full scale-150" />
								<AdrielLogoFull 
									height={60}
									className="relative z-10 drop-shadow-2xl max-w-[210px]"
								/>
							</motion.div>
						</motion.div>
						
						{/* Badge */}
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="mb-5 flex items-center gap-3"
						>
							<div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg shadow-blue-900/20">
								<span className="text-xs font-medium bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
									Adaptive • Fast • Yours
							</span>
						</div>
						<div className="px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 backdrop-blur-sm">
							<span className="text-xs font-semibold text-yellow-300 flex items-center gap-1.5">
								<svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
								Early Access
							</span>
						</div>
						<div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
							<span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
								<svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
								</svg>
								Early Development
							</span>
						</div>
					</motion.div>
					{/* Main Headline */}
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
						className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight w-full mb-5 sm:mb-6 text-center px-4"
					>
						<span className="bg-gradient-to-br from-white via-blue-50 to-white/70 bg-clip-text text-transparent drop-shadow-2xl">
							Build with your imagination
						</span>
					</motion.h1>

					{/* Tagline */}
					<motion.p
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
						className="text-base sm:text-lg md:text-xl mb-3 text-center font-light px-4"
					>
						<span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
							Vibe coding, accessible for everyone
						</span>
					</motion.p>

					{/* Description */}
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.7 }}
						className="text-white/65 text-sm sm:text-base mb-5 text-center max-w-xl px-4 leading-relaxed"
					>
						Adaptive AI that learns your style. No coding needed. Just describe what you want.
					</motion.p>

					{/* Coming Soon Badge */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.85 }}
						className="mb-6 sm:mb-8"
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-sm">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
							</span>
							<span className="text-xs font-medium text-green-300">
								Community-driven development coming soon
							</span>
						</div>
					</motion.div>

					{/* Build Input Form */}
					<motion.form
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
						whileHover={{ scale: 1.01 }}
						method="POST"
						onSubmit={(e) => {
							e.preventDefault();
							const query = textareaRef.current!.value;
							handleCreateApp(query, agentMode);
						}}
						className="relative group flex z-10 flex-col w-full min-h-[160px] sm:min-h-[150px] bg-black/40 border border-white/10 hover:border-white/30 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-900/20 p-4 sm:p-6 transition-all duration-500 touch-manipulation"
					>
						{/* Decorative glow on hover */}
						<div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-indigo-500/8 group-hover:to-cyan-500/10 transition-all duration-700 pointer-events-none" />
						
						{/* Decorative orb */}
						<div className="absolute -top-6 -right-6 w-48 h-48 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />							<div 
								className={clsx(
									"flex-1 flex flex-col relative z-10",
									isDragging && "ring-2 ring-cyan-400 ring-offset-2 ring-offset-bg-1 rounded-lg"
								)}
								{...dragHandlers}
							>
								{isDragging && (
									<div className="absolute inset-0 flex items-center justify-center bg-cyan-500/10 backdrop-blur-sm rounded-lg z-30 pointer-events-none">
										<p className="text-cyan-400 font-medium">Drop images here</p>
									</div>
								)}
								<textarea
								className="w-full resize-none ring-0 z-20 outline-0 bg-transparent placeholder:text-white/40 focus:placeholder:text-white/30 text-white text-base sm:text-lg leading-relaxed transition-colors duration-200 touch-manipulation min-h-[60px]"
								name="query"
								value={query}
								placeholder={`Create a ${currentPlaceholderText}`}
								ref={textareaRef}
								onChange={(e) => {
									setQuery(e.target.value);
									adjustTextareaHeight();
								}}
								onInput={adjustTextareaHeight}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault();
										// Don't call handleCreateApp here - let the form submit handle it
										// This prevents duplicate calls when Enter triggers both keydown and submit
										const form = e.currentTarget.form;
										if (form) {
											form.requestSubmit();
										}
									}
								}}
							/>
							{images.length > 0 && (
								<div className="mt-3">
									<ImageAttachmentPreview
										images={images}
										onRemove={removeImage}
									/>
								</div>
							)}
						</div>
						<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-4 pt-1 relative z-10 gap-3 sm:gap-0">
							{import.meta.env.VITE_AGENT_MODE_ENABLED ? (
								<AgentModeToggle
									value={agentMode}
									onChange={setAgentMode}
									className="flex-1 w-full sm:w-auto"
								/>
							) : (
								<div></div>
							)}

							<div className="flex items-center justify-end sm:ml-4 gap-2 sm:gap-2">
								<ImageUploadButton
									onFilesSelected={addImages}
									disabled={isProcessing || isCreating}
								/>
								<motion.button
									type="submit"
									disabled={!query.trim() || isCreating}
									whileHover={isCreating ? {} : { scale: 1.05 }}
									whileTap={isCreating ? {} : { scale: 0.95 }}
									className={clsx(
										"bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 text-white px-6 py-3 sm:p-2 rounded-xl flex items-center gap-2 sm:gap-0 sm:*:size-5 min-h-[48px] sm:min-h-0 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed relative group touch-manipulation font-medium backdrop-blur-xl",
										isCreating && "animate-pulse"
									)}
								>
									<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									{isCreating ? (
										<>
											<Loader className="relative z-10 animate-spin" />
											<span className="sm:hidden relative z-10">Creating...</span>
										</>
									) : (
										<>
											<span className="sm:hidden relative z-10">Build</span>
											<ArrowRight className="relative z-10 sm:block" />
										</>
									)}
								</motion.button>
							</div>
						</div>
					</motion.form>
				</motion.div>

					{/* CTAs */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.9 }}
						className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-8 px-6"
					>
						<button
							onClick={() => {
								if (!isLoggedIn) {
									requireAuth();
								}
							}}
							className="relative group px-8 py-3.5 sm:py-4 min-h-[48px] sm:min-h-0 bg-black text-white font-medium text-base sm:text-lg rounded-xl shadow-lg shadow-black/30 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 border border-white/10 hover:border-white/20 touch-manipulation w-full sm:w-auto"
						>
							<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							<span className="relative z-10">Start Building</span>
						</button>
						<button
							onClick={() => navigate('/discover')}
							className="px-8 py-3.5 bg-white/5 border border-white/20 hover:border-white/40 text-white/90 font-medium rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
						>
							Explore Apps
						</button>
					</motion.div>

				</div>

			{/* Parallax Orbs Background */}
			<OrbsBackground />

			{/* Stats Section */}
			<section className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{[
						{ value: "10ms", label: "Average Response" },
						{ value: "99.9%", label: "Uptime SLA" },
						{ value: "150+", label: "Models Available" },
						{ value: "< $0.01", label: "Cost per Request" }
					].map((stat, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ scale: 1.05, y: -4 }}
							transition={{ delay: 1.15 + i * 0.08, duration: 0.5 }}
							viewport={{ once: true }}
							className="group relative p-6 rounded-2xl bg-black/30 border border-white/10 hover:border-white/25 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20"
						>
							{/* Ambient glow on hover */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-indigo-500/10 transition-all duration-500" />
							
							<div className="relative z-10">
								<div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-br from-white via-blue-50 to-white/80 bg-clip-text text-transparent">
									{stat.value}
								</div>
								<div className="text-sm text-white/50 font-light">{stat.label}</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* Developer Section */}
			<section className="w-full max-w-7xl mx-auto px-6 py-20 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
					className="grid lg:grid-cols-2 gap-12 items-center"
				>
					<div>
						<h2 className="text-4xl md:text-5xl font-semibold mb-7 tracking-tight">
							<span className="bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
								Built by Developers,
								<br />for Developers
							</span>
						</h2>
						<p className="text-lg text-white/65 mb-8 leading-relaxed font-light">
							Every pixel, every interaction crafted with care. Experience the power of AI-driven development with the precision developers demand.
						</p>
						<div className="space-y-4">
							{[
								{ label: "Full-Stack Apps", detail: "Frontend to backend, deployed instantly" },
								{ label: "Modern Tech", detail: "React, TypeScript, Tailwind, and more" },
								{ label: "Live Preview", detail: "See changes in real-time as you build" },
								{ label: "Version Control", detail: "Track every iteration, rollback anytime" }
							].map((item, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.1, duration: 0.5 }}
									viewport={{ once: true }}
									className="flex items-start gap-3"
								>
									<div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 shadow-lg shadow-cyan-400/50" />
									<div>
										<div className="text-white/90 font-medium">{item.label}</div>
										<div className="text-white/50 text-sm font-light">{item.detail}</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="relative"
					>
						<div className="rounded-2xl bg-black/40 border border-white/10 p-6 backdrop-blur-sm font-mono text-sm overflow-hidden shadow-2xl shadow-blue-900/20">
							<div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
								<div className="flex gap-1.5">
									<div className="w-3 h-3 rounded-full bg-red-500/80" />
									<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
									<div className="w-3 h-3 rounded-full bg-green-500/80" />
								</div>
								<span className="text-white/40 text-xs ml-2">app_example.tsx</span>
							</div>
							<pre className="text-white/70 leading-relaxed">
<span className="text-purple-400">import</span> {"{"} <span className="text-blue-400">useState</span> {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;

<span className="text-purple-400">export default function</span> <span className="text-yellow-400">TodoApp</span>() {"{"}
  <span className="text-purple-400">const</span> [<span className="text-blue-300">todos</span>, <span className="text-blue-300">setTodos</span>] = <span className="text-yellow-400">useState</span>([]);

  <span className="text-purple-400">return</span> (
    {"<"}<span className="text-pink-400">div</span> <span className="text-blue-300">className</span>=<span className="text-green-400">"app"</span>{">"}
      {"<"}<span className="text-pink-400">h1</span>{">"}My Tasks{"</"}<span className="text-pink-400">h1</span>{">"}
      {"<"}<span className="text-pink-400">TaskList</span> <span className="text-blue-300">items</span>={"{"}todos{"}"} {"/>"}
    {"</"}<span className="text-pink-400">div</span>{">"}
  );
{"}"}
							</pre>
						</div>
						<div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
						<div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/15 rounded-full blur-2xl" />
					</motion.div>
				</motion.div>
			</section>

			{/* Affordability Section */}
			<section className="w-full max-w-7xl mx-auto px-6 pb-32 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-7 tracking-tight">
						<span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
							Enterprise Power,
						</span>
						<br />
						<span className="bg-gradient-to-r from-white via-blue-50 to-white/90 bg-clip-text text-transparent">
							Startup Pricing
						</span>
					</h2>
					<p className="text-lg text-white/65 max-w-3xl mx-auto font-light leading-relaxed">
						Build unlimited applications without breaking the bank. Pay only for what you use, scale effortlessly as you grow.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8">
					{[
						{ 
							title: "Pay as You Go",
							detail: "No upfront costs. Start building for free, scale when you're ready. Cancel anytime with zero commitments.",
							gradient: "from-cyan-500/20 to-blue-500/20",
							glowColor: "cyan",
							iconPath: "M13 10V3L4 14h7v7l9-11h-7z"
						},
						{ 
							title: "Transparent Pricing",
							detail: "Crystal-clear, predictable rates with no hidden fees. Know exactly what you're paying for, every single time.",
							gradient: "from-blue-500/20 to-indigo-500/20",
							glowColor: "blue",
							iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
						},
						{ 
							title: "Unlimited Apps",
							detail: "Create as many applications as you want. No artificial limits on your creativity or innovation.",
							gradient: "from-indigo-500/20 to-purple-500/20",
							glowColor: "indigo",
							iconPath: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z M12 9v6m-3-3h6"
						}
					].map((item, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ scale: 1.05, y: -8 }}
							transition={{ 
								delay: i * 0.15, 
								duration: 0.6,
								ease: [0.16, 1, 0.3, 1]
							}}
							viewport={{ once: true }}
							className="group relative p-8 rounded-3xl bg-gradient-to-br from-black/40 via-black/30 to-black/40 border border-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-500 overflow-hidden"
						>
							{/* Animated background gradient */}
							<div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
							
							{/* Glow effect */}
							<div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
							
							{/* Grid pattern overlay */}
							<div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
								style={{
									backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
									backgroundSize: '20px 20px'
								}}
							/>
							
							<div className="relative z-10">
								{/* Icon container with geometric design */}
								<div className="mb-6 relative">
									<div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl`}>
										<svg 
											className="w-8 h-8 text-white" 
											fill="none" 
											stroke="currentColor" 
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
											viewBox="0 0 24 24"
										>
											<path d={item.iconPath} />
										</svg>
									</div>
									{/* Decorative ring */}
									<div className={`absolute -inset-2 rounded-2xl border border-${item.glowColor}-400/20 group-hover:scale-125 group-hover:border-${item.glowColor}-400/40 transition-all duration-500`} />
								</div>
								
								<h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-white group-hover:to-blue-100 transition-all duration-300">
									{item.title}
								</h3>
								<p className="text-white/60 group-hover:text-white/80 font-light leading-relaxed transition-colors duration-300 text-base">
									{item.detail}
								</p>
							</div>
							
							{/* Corner accent */}
							<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						</motion.div>
					))}
				</div>

				{/* Additional pricing detail */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.5 }}
					viewport={{ once: true }}
					className="mt-16 flex justify-center gap-4 flex-wrap px-4"
				>
					{/* Live badge */}
					<motion.div
						whileHover={{ scale: 1.05, y: -2 }}
						className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 backdrop-blur-sm shadow-lg shadow-green-900/20"
					>
						<motion.div 
							className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
							animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<span className="text-white/90 text-sm font-medium bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
							Live & ready to build
						</span>
					</motion.div>

					{/* No credit card badge */}
					<motion.div
						whileHover={{ scale: 1.05, y: -2 }}
						className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 backdrop-blur-sm shadow-lg shadow-cyan-900/20"
					>
						<svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span className="text-white/90 text-sm font-medium bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
							No credit card required
						</span>
					</motion.div>
				</motion.div>

				{/* View Pricing CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					viewport={{ once: true }}
					className="mt-12 flex justify-center"
				>
					<motion.button
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => navigate('/pricing')}
						className="group relative px-8 py-4 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 text-white font-semibold text-lg shadow-2xl hover:shadow-white/20 hover:border-white/20 transition-all duration-300 overflow-hidden backdrop-blur-xl"
					>
						<span className="relative z-10 flex items-center gap-2">
							View Detailed Pricing
							<svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</span>
						<div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</motion.button>
				</motion.div>
			</section>

				<AnimatePresence>
					{images.length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="w-full max-w-2xl px-6"
						>
							<div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-bg-4/50 dark:bg-bg-2/50 border border-accent/20 dark:border-accent/30 shadow-sm">
								<Info className="size-4 text-accent flex-shrink-0 mt-0.5" />
								<p className="text-xs text-text-tertiary leading-relaxed">
									<span className="font-medium text-text-secondary">Images Beta:</span> Images guide app layout and design but may not be replicated exactly. The coding agent cannot access images directly for app assets.
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{discoverReady && (
						<motion.section
							key="discover-section"
							layout
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
							className={clsx('max-w-6xl mx-auto px-4 z-10', images.length > 0 ? 'mt-10' : 'mt-16 mb-8')}
						>
							<div className='flex flex-col items-start'>
								<h2 className="text-2xl font-medium text-text-secondary/80">Discover Apps built by the community</h2>
								<div ref={discoverLinkRef} className="text-md font-light mb-4 text-text-tertiary hover:underline underline-offset-4 select-text cursor-pointer" onClick={() => navigate('/discover')} >View All</div>
								<motion.div
									layout
									transition={{ duration: 0.4 }}
									className="grid grid-cols-2 xl:grid-cols-3 gap-6"
								>
									<AnimatePresence mode="popLayout">
										{apps.map(app => (
											<AppCard
												key={app.id}
												app={app}
												onClick={() => navigate(`/app/${app.id}`)}
												showStats={true}
												showUser={true}
												showActions={false}
											/>
										))}
									</AnimatePresence>
								</motion.div>
							</div>
						</motion.section>
					)}
				</AnimatePresence>
			</LayoutGroup>

			{/* Nudge towards Discover */}
			{user && <CurvedArrow sourceRef={discoverLinkRef} target={{ x: 50, y: window.innerHeight - 60 }} />}

			{/* Terms Acceptance Dialog */}
			<TermsAcceptanceDialog
				open={showTermsDialog}
				onAccept={handleTermsAccept}
			/>
		</div>
		</>
	);
}

// Parallax Orbs Background Component
function OrbsBackground() {
	const { scrollYProgress } = useScroll();
	
	const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
	const orb1X = useTransform(scrollYProgress, [0, 1], [0, 120]);
	
	const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 180]);
	const orb2X = useTransform(scrollYProgress, [0, 1], [0, -140]);

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
			<motion.div
				style={{ y: orb1Y, x: orb1X }}
				className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl"
				animate={{
					scale: [1, 1.15, 1],
				}}
				transition={{
					duration: 22,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				style={{ y: orb2Y, x: orb2X }}
				className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"
				animate={{
					scale: [1, 1.25, 1],
				}}
				transition={{
					duration: 28,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>
		</div>
	);
}

type ArrowProps = {
	/** Ref to the source element the arrow starts from */
	sourceRef: React.RefObject<HTMLElement | null>;
	/** Target point in viewport/client coordinates */
	target: { x: number; y: number };
	/** Curve intensity (0.1 - 1.5 is typical) */
	curvature?: number;
	/** Optional pixel offset from source element edge */
	sourceOffset?: number;
	/** If true, hides the arrow when the source is offscreen/not measurable */
	hideWhenInvalid?: boolean;
};

type Point = { x: number; y: number };

export const CurvedArrow: React.FC<ArrowProps> = ({
	sourceRef,
	target,
	curvature = 0.5,
	sourceOffset = 6,
	hideWhenInvalid = true,
}) => {
	const [start, setStart] = useState<Point | null>(null);
	const [end, setEnd] = useState<Point | null>(null);

	const rafRef = useRef<number | null>(null);
	const roRef = useRef<ResizeObserver | null>(null);

	const compute = () => {
		const el = sourceRef.current;
		if (!el) {
			setStart(null);
			setEnd(null);
			return;
		}

		const rect = el.getBoundingClientRect();
		if (!rect || rect.width === 0 || rect.height === 0) {
			setStart(null);
			setEnd(null);
			return;
		}

		const endPoint: Point = { x: target.x, y: target.y };

		// Choose an anchor on the source: midpoint of the side facing the target
		const centers = {
			right: { x: rect.right, y: rect.top + rect.height / 2 },
			left: { x: rect.left, y: rect.top + rect.height / 2 },
		};

		// Distances to target from each side center
		const dists = Object.fromEntries(
			Object.entries(centers).map(([side, p]) => [
				side,
				(p.x - endPoint.x) ** 2 + (p.y - endPoint.y) ** 2,
			])
		) as Record<keyof typeof centers, number>;

		const bestSide = (Object.entries(dists).sort((a, b) => a[1] - b[1])[0][0] ||
			"right") as keyof typeof centers;

		// Nudge start point slightly outside the element for visual clarity
		const nudge = (p: Point, side: keyof typeof centers, offset: number) => {
			switch (side) {
				case "right":
					return { x: p.x + offset, y: p.y };
				case "left":
					return { x: p.x - offset, y: p.y };
			}
		};

		const startPoint = nudge(centers[bestSide], bestSide, sourceOffset);

		setStart(startPoint);
		setEnd(endPoint);
	};

	// Throttle updates with rAF to avoid layout thrash
	const scheduleCompute = () => {
		if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
		rafRef.current = requestAnimationFrame(compute);
	};

	useEffect(() => {
		scheduleCompute();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [target.x, target.y, sourceRef.current]);

	useEffect(() => {
		const onScroll = () => scheduleCompute();
		const onResize = () => scheduleCompute();

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);

		// Track source element size changes
		const el = sourceRef.current;
		if ("ResizeObserver" in window) {
			roRef.current = new ResizeObserver(() => scheduleCompute());
			if (el) roRef.current.observe(el);
		}

		scheduleCompute();

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
			if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
			if (roRef.current && el) roRef.current.unobserve(el);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const d = useMemo(() => {
		if (!start || !end) return "";

		const dx = end.x - start.x;
		const dy = end.y - start.y;

		// Control points: bend the curve based on the primary axis difference.
		// This gives a nice S or C curve without sharp kinks.
		const cpOffset = Math.max(Math.abs(dx), Math.abs(dy)) * curvature;

		const c1: Point = { x: start.x + cpOffset * (dx >= 0 ? 1 : -1), y: start.y };
		const c2: Point = { x: end.x - cpOffset * (dx >= 0 ? 1 : -1), y: end.y };

		return `M ${start.x},${start.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${end.x},${end.y}`;
	}, [start, end, curvature]);

	const hidden = hideWhenInvalid && (!start || !end);

	if (start && end && (end.y - start.y > 420 || start.x - end.x < 100)) {
		return null;
	}

	return (
		<svg
			aria-hidden="true"
			style={{
				position: "fixed",
				inset: 0,
				width: "100vw",
				height: "100vh",
				pointerEvents: "none",
				overflow: "visible",
				zIndex: 9999,
				display: hidden ? "none" : "block",
			}}
		>
			<defs>
				<filter id="discover-squiggle" x="-20%" y="-20%" width="140%" height="140%">
					<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="3" result="noise" />
					<feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
				</filter>
				<marker id="discover-arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth" opacity={0.20}>
					<path d="M 0 1.2 L 7 4" stroke="var(--color-text-tertiary)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
					<path d="M 0 6.8 L 7 4" stroke="var(--color-text-tertiary)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
				</marker>
			</defs>

			<path
				d={d}
				// stroke="var(--color-accent)"
				stroke="var(--color-text-tertiary)"
				strokeOpacity={0.20}
				strokeWidth={1.6}
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				vectorEffect="non-scaling-stroke"
				markerEnd="url(#discover-arrowhead)"
			/>
			{/* Soft squiggle overlay for hand-drawn feel */}
			<g filter="url(#discover-squiggle)">
				<path
					d={d}
					// stroke="var(--color-accent)"
					stroke="var(--color-text-tertiary)"
					strokeOpacity={0.12}
					strokeWidth={1}
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeDasharray="8 6 4 9 5 7"
				vectorEffect="non-scaling-stroke"
			/>
		</g>
	</svg>
	);
};
