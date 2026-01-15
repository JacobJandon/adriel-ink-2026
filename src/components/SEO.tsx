import { Helmet } from 'react-helmet-async';

interface SEOProps {
	title?: string;
	description?: string;
	keywords?: string;
	ogImage?: string;
	ogType?: string;
	twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
	noindex?: boolean;
}

const DEFAULT_TITLE = 'Adriel AI - AI-Native Development Platform';
const DEFAULT_DESCRIPTION = 'Build, deploy, and iterate on full-stack apps with conversational AI, instant Cloudflare deployments, and a community-driven approach that puts developers first.';
const DEFAULT_KEYWORDS = 'AI development, AI coding, full-stack development, Cloudflare Workers, AI platform, developer tools, code generation, app builder';
const DEFAULT_OG_IMAGE = 'https://adriel.ink/assets/adriel-full.png';
const SITE_URL = 'https://adriel.ink';

export function SEO({
	title,
	description = DEFAULT_DESCRIPTION,
	keywords = DEFAULT_KEYWORDS,
	ogImage = DEFAULT_OG_IMAGE,
	ogType = 'website',
	twitterCard = 'summary_large_image',
	noindex = false,
}: SEOProps) {
	const fullTitle = title ? `${title} | Adriel AI` : DEFAULT_TITLE;

	return (
		<Helmet>
			{/* Primary Meta Tags */}
			<title>{fullTitle}</title>
			<meta name="title" content={fullTitle} />
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			
			{/* Robots */}
			{noindex && <meta name="robots" content="noindex, nofollow" />}
			
			{/* Open Graph / Facebook */}
			<meta property="og:type" content={ogType} />
			<meta property="og:url" content={SITE_URL} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={ogImage} />
			<meta property="og:site_name" content="Adriel AI" />
			
			{/* Twitter */}
			<meta property="twitter:card" content={twitterCard} />
			<meta property="twitter:url" content={SITE_URL} />
			<meta property="twitter:title" content={fullTitle} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={ogImage} />
			
			{/* Additional Meta Tags */}
			<meta name="theme-color" content="#0ea5e9" />
			<meta name="msapplication-TileColor" content="#0ea5e9" />
			<link rel="canonical" href={SITE_URL} />
			
			{/* Favicon */}
			<link rel="icon" type="image/png" href="/assets/adriel-icon.png" sizes="32x32" />
			<link rel="icon" type="image/png" href="/assets/adriel-icon.png" sizes="192x192" />
			<link rel="apple-touch-icon" href="/assets/adriel-icon.png" />
		</Helmet>
	);
}
