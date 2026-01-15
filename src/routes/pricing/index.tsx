import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';
import {
	TIER_PRICING,
	SUBSCRIPTION_TIERS,
	type BillingPeriod,
} from '@/../shared/types/pricing';
import { motion } from 'framer-motion';
import { useQuotaStatus } from '@/hooks/use-quota-status';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PricingPage() {
	const { quota } = useQuotaStatus();
	const currentTier = quota?.tier || 'free';
	const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

	const tiers = [
		{
			key: SUBSCRIPTION_TIERS.FREE,
			data: TIER_PRICING.free,
			features: [
				'5 AI requests/month',
				'50K tokens/month',
				'5 apps maximum',
				'5 preview runs',
				'Community support',
			],
		},
		{
			key: SUBSCRIPTION_TIERS.STARTER,
			data: TIER_PRICING.starter,
			features: [
				'150 AI requests/month',
				'500K tokens/month',
				'25 apps maximum',
				'150 preview runs',
				'GitHub export',
				'Private projects',
				'Standard support',
			],
		},
		{
			key: SUBSCRIPTION_TIERS.NEURAL,
			data: TIER_PRICING.neural,
			features: [
				'500 AI requests/month',
				'2M tokens/month',
				'65 apps maximum',
				'500 preview runs',
				'Full export + GitHub',
				'Private projects',
				'Add-ons available',
				'Priority support',
			],
		},
		{
			key: SUBSCRIPTION_TIERS.PREMIUM,
			data: TIER_PRICING.premium,
			features: [
				'5000 AI requests/month',
				'10M tokens/month',
				'100+ apps',
				'5000 preview runs',
				'Full export',
				'Bring Your Own API Keys',
				'Add-ons available',
				'Priority support',
			],
		},
	];

	const handleUpgrade = (tier: string) => {
		// Show coming soon message for now (Stripe integration pending)
		toast.info('Stripe integration coming soon!', {
			description: `You selected: ${TIER_PRICING[tier as keyof typeof TIER_PRICING].name} - ${billingPeriod === 'annual' ? TIER_PRICING[tier as keyof typeof TIER_PRICING].priceAnnualFormatted + '/year' : TIER_PRICING[tier as keyof typeof TIER_PRICING].priceFormatted + '/month'}`,
			duration: 5000,
		});
	};

	return (
		<div className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center space-y-4"
			>
				<h1 className="text-4xl font-bold font-departure-mono text-text-primary">
					PRICING
				</h1>
				<p className="text-lg text-text-secondary max-w-2xl mx-auto">
					Choose the plan that fits your needs. Upgrade or downgrade anytime.
				</p>
				
				{/* Billing Toggle */}
				<div className="flex items-center justify-center gap-3 py-4">
					<span className={billingPeriod === 'monthly' ? 'text-text-primary font-medium' : 'text-text-tertiary'}>
						Monthly
					</span>
					<button
						onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
						className="relative w-14 h-7 rounded-full bg-bg-4 border border-border-primary transition-colors hover:bg-bg-3"
					>
						<motion.div
							className="absolute top-0.5 w-6 h-6 rounded-full bg-accent shadow-lg"
							animate={{ left: billingPeriod === 'annual' ? '1.5rem' : '0.125rem' }}
							transition={{ type: 'spring', stiffness: 500, damping: 30 }}
						/>
					</button>
					<span className={billingPeriod === 'annual' ? 'text-text-primary font-medium' : 'text-text-tertiary'}>
						Annual
						<Badge variant="outline" className="ml-2 bg-green-500/10 text-green-400 border-green-500/30">
							Save 17%
						</Badge>
					</span>
				</div>
				
				{currentTier && (
					<Badge variant="outline" className="text-sm">
						Current Plan:{' '}
						{TIER_PRICING[currentTier as keyof typeof TIER_PRICING].name}
					</Badge>
				)}
			</motion.div>

			{/* Pricing Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{tiers.map((tier, index) => {
					const isCurrentTier = tier.key === currentTier;
					const isRecommended = tier.key === SUBSCRIPTION_TIERS.NEURAL;

					return (
						<motion.div
							key={tier.key}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="relative"
						>
							{isRecommended && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
									<Badge className="bg-primary text-primary-foreground px-4 py-1">
										<Zap className="h-3 w-3 mr-1 inline" />
										Recommended
									</Badge>
								</div>
							)}
							<Card
								className={`h-full flex flex-col ${
									isRecommended
										? 'border-primary shadow-lg shadow-primary/20'
										: ''
								} ${isCurrentTier ? 'border-primary/50' : ''}`}
							>
								<CardHeader className="space-y-4">
									<div className="space-y-2">
										<CardTitle className="flex items-center justify-between">
											<span>{tier.data.name}</span>
											{isCurrentTier && (
												<Badge variant="secondary" className="text-xs">
													Current
												</Badge>
											)}
										</CardTitle>
										<p className="text-sm text-text-secondary">
											{tier.data.description}
										</p>
									</div>
									<div className="space-y-1">
										<div className="flex items-baseline gap-1">
											<span className="text-4xl font-bold">
												{billingPeriod === 'annual' 
													? tier.data.priceAnnualFormatted 
													: tier.data.priceFormatted}
											</span>
											{tier.data.price > 0 && (
												<span className="text-text-secondary">
													{billingPeriod === 'annual' ? '/year' : '/month'}
												</span>
											)}
										</div>
										{tier.data.price > 0 && billingPeriod === 'annual' && (
											<>
												<p className="text-xs text-text-tertiary">
													${(tier.data.priceAnnual / 12).toFixed(2)}/month when billed annually
												</p>
												<p className="text-xs text-green-400">
													Save ${(tier.data.price * 12 - tier.data.priceAnnual).toFixed(2)} vs monthly billing
												</p>
											</>
										)}
									</div>
								</CardHeader>
								<CardContent className="flex-1 flex flex-col justify-between space-y-6">
									<ul className="space-y-3">
										{tier.features.map((feature) => (
											<li key={feature} className="flex items-start gap-2">
												<Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
												<span className="text-sm text-text-secondary">
													{feature}
												</span>
											</li>
										))}
									</ul>
									<Button
										onClick={() => handleUpgrade(tier.key)}
										disabled={isCurrentTier}
										variant={
											isCurrentTier
												? 'outline'
												: isRecommended
													? 'default'
													: 'outline'
										}
										className="w-full"
									>
										{isCurrentTier
											? 'Current Plan'
											: tier.key === SUBSCRIPTION_TIERS.FREE
												? 'Downgrade'
												: 'Upgrade'}
									</Button>
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</div>

			{/* Footer Note */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
				className="text-center text-sm text-text-secondary space-y-2 pt-8"
			>
				<p>* Unlimited apps subject to fair use policy.</p>
				<p>
					All plans include AI credits included in the monthly fee. Additional
					usage beyond limits subject to availability.
				</p>
				<p>
					Need more? <span className="text-primary">Contact us</span> for
					enterprise solutions.
				</p>
			</motion.div>

			{/* FAQ Section */}
			<motion.div
				id="faq"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="mt-16 max-w-3xl mx-auto"
			>
				<h2 className="text-3xl font-bold text-center mb-8">
					Frequently Asked Questions
				</h2>
				<div className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								Can I change plans anytime?
							</CardTitle>
						</CardHeader>
						<CardContent className="text-text-secondary">
							Yes! You can upgrade or downgrade your plan at any time. Changes
							take effect at the start of your next billing cycle.
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								What happens if I exceed my quota?
							</CardTitle>
						</CardHeader>
						<CardContent className="text-text-secondary">
							If you exceed your monthly or hourly limits, AI features will be
							temporarily unavailable until you upgrade or your quota resets. You
							can monitor your usage in real-time on the Usage & Billing page.
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
						</CardHeader>
						<CardContent className="text-text-secondary">
							We accept all major credit cards (Visa, Mastercard, American
							Express) via Stripe. All payments are secure and encrypted.
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								Is there a free trial for paid plans?
							</CardTitle>
						</CardHeader>
						<CardContent className="text-text-secondary">
							The Free tier lets you try the platform at no cost. When you're
							ready for more features, you can upgrade to a paid plan with no
							commitment - cancel anytime.
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								What does "BYOK" mean in the Premium plan?
							</CardTitle>
						</CardHeader>
						<CardContent className="text-text-secondary">
							"Bring Your Own Keys" allows you to use your own API keys for AI
							providers (OpenAI, Anthropic, etc.), giving you more control and
							potentially lower costs for heavy usage.
						</CardContent>
					</Card>
				</div>
			</motion.div>
		</div>
	);
}
