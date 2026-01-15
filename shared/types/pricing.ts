/**
 * Shared pricing and subscription tier configuration
 * Used across frontend and backend
 */

export const SUBSCRIPTION_TIERS = {
    FREE: 'free',
    STARTER: 'starter',
    NEURAL: 'neural',
    PREMIUM: 'premium',
} as const;

export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS];

export type BillingPeriod = 'monthly' | 'annual';

/**
 * Pricing information for each tier
 */
export const TIER_PRICING = {
    [SUBSCRIPTION_TIERS.FREE]: {
        name: 'Free',
        price: 0,
        priceFormatted: '$0',
        priceAnnual: 0,
        priceAnnualFormatted: '$0',
        description: 'For trying only',
        features: {
            aiUsage: 'Very Low',
            apps: 5,
            previewRuns: 5,
            storage: 'Tiny',
            privateProjects: false,
            exports: 'None',
            models: 'Default Model Only',
            byok: false,
            addOns: false,
            support: 'Community',
        },
    },
    [SUBSCRIPTION_TIERS.STARTER]: {
        name: 'Starter',
        price: 7.99,
        priceFormatted: '$7.99',
        priceAnnual: 79,
        priceAnnualFormatted: '$79',
        description: 'Beginner-friendly',
        features: {
            aiUsage: 'Low',
            apps: 25,
            previewRuns: 150,
            storage: 'Small',
            privateProjects: true,
            exports: 'GitHub Export',
            models: 'Default Models',
            byok: false,
            addOns: false,
            support: 'Standard',
        },
    },
    [SUBSCRIPTION_TIERS.NEURAL]: {
        name: 'Neural',
        price: 14.99,
        priceFormatted: '$14.99',
        priceAnnual: 149,
        priceAnnualFormatted: '$149',
        description: 'Best plan',
        recommended: true,
        features: {
            aiUsage: 'Medium',
            apps: 65,
            previewRuns: 500,
            storage: 'Medium',
            privateProjects: true,
            exports: 'Full Export + GitHub',
            models: 'Default Models',
            byok: false,
            addOns: true,
            support: 'Priority',
        },
    },
    [SUBSCRIPTION_TIERS.PREMIUM]: {
        name: 'Premium',
        price: 24.99,
        priceFormatted: '$24.99',
        priceAnnual: 249,
        priceAnnualFormatted: '$249',
        description: 'Heavy users',
        features: {
            aiUsage: 'High',
            apps: '100+',
            previewRuns: 5000,
            storage: 'Large',
            privateProjects: true,
            exports: 'Full Export',
            models: 'Default Models + BYOK',
            byok: true,
            addOns: true,
            support: 'Priority',
        },
    },
} as const;

/**
 * Technical limits for each tier (backend enforcement)
 */
export const TIER_LIMITS = {
    [SUBSCRIPTION_TIERS.FREE]: {
        monthlyRequestLimit: 5,
        monthlyTokenLimit: 50000,
        monthlyCostLimitCents: 0,
        hourlyRequestLimit: 2,
        maxApps: 5,
        privateProjects: false,
        githubExport: false,
        byok: false,
        addOns: false,
    },
    [SUBSCRIPTION_TIERS.STARTER]: {
        monthlyRequestLimit: 150,
        monthlyTokenLimit: 500000,
        monthlyCostLimitCents: 300, // ~$3 AI credits
        hourlyRequestLimit: 20,
        maxApps: 25,
        privateProjects: true,
        githubExport: true,
        byok: false,
        addOns: false,
    },
    [SUBSCRIPTION_TIERS.NEURAL]: {
        monthlyRequestLimit: 500,
        monthlyTokenLimit: 2000000,
        monthlyCostLimitCents: 700, // ~$7 AI credits
        hourlyRequestLimit: 50,
        maxApps: 65,
        privateProjects: true,
        githubExport: true,
        byok: false,
        addOns: true,
    },
    [SUBSCRIPTION_TIERS.PREMIUM]: {
        monthlyRequestLimit: 5000,
        monthlyTokenLimit: 10000000,
        monthlyCostLimitCents: 1500, // ~$15 AI credits
        hourlyRequestLimit: 200,
        maxApps: 100,
        privateProjects: true,
        githubExport: true,
        byok: true,
        addOns: true,
    },
} as const;

/**
 * Stripe Price IDs (set these after creating products in Stripe)
 */
export const STRIPE_PRICE_IDS = {
    [SUBSCRIPTION_TIERS.STARTER]: {
        monthly: process.env.STRIPE_PRICE_ID_STARTER_MONTHLY || 'price_starter_monthly',
        annual: process.env.STRIPE_PRICE_ID_STARTER_ANNUAL || 'price_starter_annual',
    },
    [SUBSCRIPTION_TIERS.NEURAL]: {
        monthly: process.env.STRIPE_PRICE_ID_NEURAL_MONTHLY || 'price_neural_monthly',
        annual: process.env.STRIPE_PRICE_ID_NEURAL_ANNUAL || 'price_neural_annual',
    },
    [SUBSCRIPTION_TIERS.PREMIUM]: {
        monthly: process.env.STRIPE_PRICE_ID_PREMIUM_MONTHLY || 'price_premium_monthly',
        annual: process.env.STRIPE_PRICE_ID_PREMIUM_ANNUAL || 'price_premium_annual',
    },
} as const;
