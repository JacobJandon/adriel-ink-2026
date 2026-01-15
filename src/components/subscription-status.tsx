/**
 * Subscription Status Component
 * Displays current subscription tier with upgrade CTA
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, ArrowUp, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TIER_PRICING, SUBSCRIPTION_TIERS } from '@/../shared/types/pricing';
import { useQuotaStatus } from '@/hooks/use-quota-status';
import { cn } from '@/lib/utils';

interface SubscriptionStatusProps {
	className?: string;
	showDetails?: boolean;
	compact?: boolean;
}

export function SubscriptionStatus({ 
	className, 
	showDetails = true,
	compact = false 
}: SubscriptionStatusProps) {
	const navigate = useNavigate();
	const { quota, loading } = useQuotaStatus();
	
	// Default to free tier if no quota data
	const currentTierKey = (quota?.tier || 'free') as keyof typeof TIER_PRICING;
	const tierData = TIER_PRICING[currentTierKey];
	
	if (loading) {
		return (
			<Card className={cn('animate-pulse', className)}>
				<CardHeader>
					<div className="h-6 bg-bg-3 rounded w-32" />
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="h-4 bg-bg-3 rounded w-full" />
						<div className="h-4 bg-bg-3 rounded w-3/4" />
					</div>
				</CardContent>
			</Card>
		);
	}

	const isFreeTier = currentTierKey === SUBSCRIPTION_TIERS.FREE;
	const isPremiumTier = currentTierKey === SUBSCRIPTION_TIERS.PREMIUM;

	if (compact) {
		return (
			<div className={cn('flex items-center gap-2', className)}>
				<Badge 
					variant={isFreeTier ? 'secondary' : 'default'}
					className={cn(
						'gap-1',
						!isFreeTier && 'bg-gradient-to-r from-accent to-accent/80'
					)}
				>
					<Zap className="h-3 w-3" />
					{tierData.name}
				</Badge>
				{!isPremiumTier && (
					<Button
						size="sm"
						variant="ghost"
						onClick={() => navigate('/pricing')}
						className="h-6 px-2"
					>
						<ArrowUp className="h-3 w-3 mr-1" />
						Upgrade
					</Button>
				)}
			</div>
		);
	}

	return (
		<Card className={cn('border-border-primary', className)}>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<span>Current Plan</span>
					<Badge 
						variant={isFreeTier ? 'secondary' : 'default'}
						className={cn(
							'gap-1 text-sm',
							!isFreeTier && 'bg-gradient-to-r from-accent to-accent/80'
						)}
					>
						<Zap className="h-3 w-3" />
						{tierData.name}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Price Display */}
				{!isFreeTier && (
					<div className="flex items-baseline gap-2">
						<span className="text-3xl font-bold">{tierData.priceFormatted}</span>
						<span className="text-text-secondary">/month</span>
					</div>
				)}

				{showDetails && (
					<>
						{/* Usage Overview */}
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-text-secondary">AI Requests</span>
								<span className="font-medium">
									{quota?.current?.monthlyRequests || 0} / {quota?.limits?.monthlyRequests || tierData.features.aiUsage}
								</span>
							</div>
							{quota && quota.current && quota.limits && (
								<div className="w-full bg-bg-3 rounded-full h-2 overflow-hidden">
									<div 
										className="bg-gradient-to-r from-accent to-accent/80 h-full transition-all duration-300"
										style={{ 
											width: `${Math.min(100, ((quota.current.monthlyRequests || 0) / (quota.limits.monthlyRequests || 1)) * 100)}%` 
										}}
									/>
								</div>
							)}
						</div>

						{/* Key Features */}
						{tierData.description && (
							<div className="pt-2 border-t border-border-primary">
								<p className="text-sm text-text-secondary mb-3">{tierData.description}</p>
								<ul className="space-y-2">
									{[
										tierData.features.aiUsage && `${tierData.features.aiUsage} AI requests`,
										tierData.features.apps && `Up to ${tierData.features.apps} apps`,
										tierData.features.support && tierData.features.support,
									].filter(Boolean).slice(0, 3).map((feature, idx) => (
										<li key={idx} className="flex items-start gap-2 text-sm">
											<Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
											<span className="text-text-secondary">{feature}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</>
				)}

				{/* CTA Buttons */}
				<div className="flex gap-2 pt-2">
					{!isPremiumTier && (
						<Button
							onClick={() => navigate('/pricing')}
							className="flex-1"
							variant={isFreeTier ? 'default' : 'outline'}
						>
							<ArrowUp className="h-4 w-4 mr-2" />
							{isFreeTier ? 'Upgrade Plan' : 'View Plans'}
						</Button>
					)}
					<Button
						onClick={() => navigate('/usage')}
						variant="outline"
						className={cn(!isPremiumTier ? 'flex-1' : 'w-full')}
					>
						View Usage
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
