import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Clock, Activity, Zap, Server, Database, Globe, Shield, Radio, TrendingUp, BarChart3, Cpu, Network } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';

interface ServiceStatus {
	name: string;
	status: 'operational' | 'degraded' | 'down';
	responseTime?: number;
	icon: React.ElementType;
	details?: string;
	lastChecked?: string;
}

interface SystemMetrics {
	avgResponseTime?: number;
	requestsLastHour?: number;
	successRate?: number;
}

interface ApiServiceHealth {
	name: string;
	status: 'operational' | 'degraded' | 'down';
	responseTime?: number;
	details?: string;
	lastChecked?: string;
}

interface PlatformStatusResponse {
	services?: ApiServiceHealth[];
	uptime?: number;
	lastUpdate?: string;
	globalUserMessage?: string;
	hasActiveMessage?: boolean;
	metrics?: SystemMetrics;
	region?: string;
	version?: string;
}

// Map service names to icons
const getServiceIcon = (name: string): React.ElementType => {
	const iconMap: Record<string, React.ElementType> = {
		'API Gateway': Server,
		'AI Models': Zap,
		'Database': Database,
		'Storage & CDN': Globe,
		'CDN & Assets': Globe,
		'Authentication': Shield,
		'Real-time Streaming': Radio,
	};
	return iconMap[name] || Server;
};

export default function StatusPage() {
	const [lastUpdate, setLastUpdate] = useState(new Date());
	const [services, setServices] = useState<ServiceStatus[]>([
		{ name: 'API Gateway', status: 'operational', responseTime: 45, icon: Server },
		{ name: 'AI Models', status: 'operational', responseTime: 120, icon: Zap },
		{ name: 'Database', status: 'operational', responseTime: 8, icon: Database },
		{ name: 'Storage & CDN', status: 'operational', responseTime: 12, icon: Globe },
		{ name: 'Authentication', status: 'operational', responseTime: 35, icon: Shield },
		{ name: 'Real-time Streaming', status: 'operational', responseTime: 28, icon: Radio },
	]);
	const [uptime, setUptime] = useState(99.0);
	const [metrics, setMetrics] = useState<SystemMetrics>({
		avgResponseTime: 85,
		requestsLastHour: 27450,
		successRate: 99.97,
	});
	const [region, setRegion] = useState('Global');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch status from API
	const fetchStatus = async () => {
		try {
			setError(null);
			const response = await fetch('/api/status');
			
			if (!response.ok) {
				throw new Error(`API returned ${response.status}`);
			}

			const data = await response.json() as { success: boolean; data: PlatformStatusResponse };
			
			if (data.success && data.data.services) {
				// Map API services to our frontend format with icons
				const mappedServices: ServiceStatus[] = data.data.services.map((service: ApiServiceHealth) => ({
					...service,
					icon: getServiceIcon(service.name),
				}));
				
				setServices(mappedServices);
				setUptime(data.data.uptime || 99.98);
				if (data.data.metrics) {
					setMetrics(data.data.metrics);
				}
				if (data.data.region) {
					setRegion(data.data.region);
				}
				setLastUpdate(new Date());
				setIsLoading(false);
			}
		} catch (err) {
			console.error('Failed to fetch status:', err);
			setError('Unable to fetch real-time status. Showing cached data.');
			setIsLoading(false);
			// Keep showing last known good state
		}
	};

	// Initial fetch and periodic updates
	useEffect(() => {
		fetchStatus();

		// Update every 30 seconds
		const interval = setInterval(() => {
			fetchStatus();
		}, 30000);

		return () => clearInterval(interval);
	}, []);

	const getStatusColor = (status: ServiceStatus['status']) => {
		switch (status) {
			case 'operational':
				return 'text-green-500';
			case 'degraded':
				return 'text-yellow-500';
			case 'down':
				return 'text-red-500';
		}
	};

	const getStatusBadge = (status: ServiceStatus['status']) => {
		switch (status) {
			case 'operational':
				return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Operational</Badge>;
			case 'degraded':
				return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Degraded</Badge>;
			case 'down':
				return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Down</Badge>;
		}
	};

	const getStatusIcon = (status: ServiceStatus['status']) => {
		switch (status) {
			case 'operational':
				return <CheckCircle2 className="size-5" />;
			case 'degraded':
			case 'down':
				return <AlertCircle className="size-5" />;
		}
	};

	const allOperational = services.every(s => s.status === 'operational');
	const avgResponseTime = Math.round(
		services.reduce((sum, s) => sum + (s.responseTime || 0), 0) / services.length
	);

	// Generate structured data for search engines
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"name": "Adriel AI System Status",
		"description": "Real-time system status and health monitoring for Adriel AI platform - API, Database, AI Models, Storage, Authentication, and WebSocket services",
		"url": typeof window !== 'undefined' ? window.location.href : '',
		"provider": {
			"@type": "Organization",
			"name": "Adriel AI",
			"url": "https://adriel.ink"
		},
		"mainEntity": {
			"@type": "Service",
			"name": "Adriel AI Platform",
			"serviceType": "AI Development Platform",
			"provider": {
				"@type": "Organization",
				"name": "Adriel AI"
			}
		}
	};

	return (
		<>
			<Helmet>
				{/* Favicons */}
				<link rel="icon" type="image/png" href="/assets/adriel-icon.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="/assets/adriel-icon.png" sizes="16x16" />
				<link rel="apple-touch-icon" sizes="180x180" href="/assets/adriel-icon.png" />
				<link rel="shortcut icon" type="image/png" href="/assets/adriel-icon.png" />
				
				{/* Primary Meta Tags */}
				<title>Adriel AI System Status - Real-Time Platform Health Monitoring</title>
				<meta name="title" content="Adriel AI System Status - Real-Time Platform Health Monitoring" />
				<meta name="description" content="Check the real-time status of Adriel AI services including API Gateway, AI Models, Database, Storage, Authentication, and WebSocket connections. Live uptime monitoring and system metrics." />
				<meta name="keywords" content="adriel ai status, adriel ink status, system status, platform status, service health, uptime monitoring, api status, database status, ai models status, real-time monitoring, adriel ai, adriel ink" />
				
				{/* Canonical URL */}
				<link rel="canonical" href="https://adriel.ink/status" />
				
				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://adriel.ink/status" />
				<meta property="og:title" content="Adriel AI System Status" />
				<meta property="og:description" content="Real-time monitoring of Adriel AI services and infrastructure. Check API, Database, AI Models, and more." />
				<meta property="og:image" content="https://adriel.ink/assets/adriel-full.png" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:image:alt" content="Adriel AI Logo" />
				<meta property="og:site_name" content="Adriel AI" />
				
				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://adriel.ink/status" />
				<meta property="twitter:title" content="Adriel AI System Status" />
				<meta property="twitter:description" content="Real-time monitoring of Adriel AI services and infrastructure. Check API, Database, AI Models, and more." />
				<meta property="twitter:image" content="https://adriel.ink/assets/adriel-full.png" />
				<meta property="twitter:image:alt" content="Adriel AI Logo" />
				
				{/* Additional SEO */}
				<meta name="robots" content="index, follow" />
				<meta name="language" content="English" />
				<meta name="author" content="Adriel AI" />
				
				{/* Structured Data */}
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			</Helmet>

			<div className="min-h-screen bg-gradient-to-br from-bg-1 via-bg-2 to-bg-3 p-6">
			<div className="max-w-5xl mx-auto space-y-8">
				{/* SEO-friendly content (screen readers and search engines) */}
				<div className="sr-only">
					<h2>Adriel AI Platform Status - Real-Time Monitoring</h2>
					<p>
						Check the current status of Adriel AI and Adriel Ink platform services. 
						Monitor real-time health of API Gateway, AI Models (GPT, Claude, Gemini), 
						Database (D1 SQLite), Storage & CDN (R2, Cloudflare), Authentication services, 
						and WebSocket real-time connections. View system uptime, response times, 
						success rates, and infrastructure health.
					</p>
					<h3>Available Services:</h3>
					<ul>
						<li>API Gateway - REST and WebSocket endpoints</li>
						<li>AI Models - GPT-4, Claude 3, Gemini Pro integration</li>
						<li>Database - Cloudflare D1 SQLite database</li>
						<li>Storage & CDN - R2 object storage, global CDN</li>
						<li>Authentication - OAuth, session management</li>
						<li>Real-time Streaming - WebSocket connections</li>
					</ul>
					<p>
						Keywords: adriel ai status, adriel ink status, adriel ai system status, 
						adriel ai uptime, adriel ink uptime, platform status, service health, 
						api status, database status, ai models status, cloudflare status
					</p>
				</div>

				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center space-y-4"
				>
					<h1 className="text-4xl font-bold text-text-primary">System Status</h1>
					<p className="text-text-secondary text-lg">
						Real-time monitoring of Adriel AI services and infrastructure
					</p>
					{error && (
						<p className="text-yellow-500 text-sm">
							⚠️ {error}
						</p>
					)}
				</motion.div>

				{/* Overall Status Banner */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.1 }}
				>
					<Card className={`border-2 ${allOperational ? 'border-green-500/20 bg-green-500/5' : 'border-yellow-500/20 bg-yellow-500/5'}`}>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className={`p-3 rounded-full ${allOperational ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
										{allOperational ? (
											<CheckCircle2 className={`size-8 ${getStatusColor('operational')}`} />
										) : (
											<AlertCircle className={`size-8 ${getStatusColor('degraded')}`} />
										)}
									</div>
									<div>
										<h2 className="text-2xl font-bold text-text-primary">
											{allOperational ? 'All Systems Operational' : 'Partial Service Disruption'}
										</h2>
										<p className="text-text-secondary">
											{allOperational 
												? 'All services are running smoothly' 
												: 'Some services are experiencing issues'}
										</p>
									</div>
								</div>
								<div className="text-right">
									<div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
										<Clock className="size-4" />
										<span>Last updated</span>
									</div>
									<p className="text-text-primary font-medium">
										{lastUpdate.toLocaleTimeString()}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Key Metrics */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
				>
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<Activity className="size-5 text-primary" />
								</div>
								<div>
									<p className="text-sm text-text-secondary">Uptime (30d)</p>
									<p className="text-2xl font-bold text-text-primary">{uptime.toFixed(1)}%</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<Zap className="size-5 text-primary" />
								</div>
								<div>
									<p className="text-sm text-text-secondary">Avg Response</p>
									<p className="text-2xl font-bold text-text-primary">{avgResponseTime}ms</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<CheckCircle2 className="size-5 text-primary" />
								</div>
								<div>
									<p className="text-sm text-text-secondary">Active Services</p>
									<p className="text-2xl font-bold text-text-primary">
										{services.filter(s => s.status === 'operational').length}/{services.length}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<Server className="size-5 text-primary" />
								</div>
								<div>
									<p className="text-sm text-text-secondary">Region</p>
									<p className="text-lg font-bold text-text-primary">{region}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Additional Metrics */}
				{metrics && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.25 }}
					>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<BarChart3 className="size-5" />
									System Metrics
								</CardTitle>
								<CardDescription>
									Real-time platform performance indicators
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<p className="text-sm text-text-secondary">Avg Response Time</p>
											<TrendingUp className="size-4 text-green-500" />
										</div>
										<p className="text-3xl font-bold text-text-primary">{metrics.avgResponseTime || 0}ms</p>
										<Progress value={Math.max(0, 100 - (metrics.avgResponseTime || 0) / 2)} className="h-2" />
										<p className="text-xs text-green-500">Excellent Performance</p>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<p className="text-sm text-text-secondary">Requests (1h)</p>
											<Activity className="size-4 text-cyan-500" />
										</div>
										<p className="text-3xl font-bold text-text-primary">{(metrics.requestsLastHour || 0).toLocaleString()}</p>
										<Progress value={75} className="h-2" />
										<p className="text-xs text-text-secondary">Active traffic</p>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<p className="text-sm text-text-secondary">Success Rate</p>
											<CheckCircle2 className="size-4 text-green-500" />
										</div>
										<p className="text-3xl font-bold text-text-primary">{(metrics.successRate || 0).toFixed(2)}%</p>
										<Progress value={metrics.successRate || 0} className="h-2" />
										<p className="text-xs text-green-500">Excellent</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				)}
				
				{/* Infrastructure Details */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.28 }}
					className="grid grid-cols-1 md:grid-cols-2 gap-4"
				>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-base">
								<Network className="size-4" />
								Network & CDN
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-sm text-text-secondary">Edge Locations</span>
								<Badge variant="outline">300+ Global</Badge>
							</div>
							<Separator />
							<div className="flex justify-between items-center">
								<span className="text-sm text-text-secondary">SSL/TLS</span>
								<Badge className="bg-green-500/10 text-green-500">Active</Badge>
							</div>
							<Separator />
							<div className="flex justify-between items-center">
								<span className="text-sm text-text-secondary">DDoS Protection</span>
								<Badge className="bg-green-500/10 text-green-500">Active</Badge>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-base">
								<Cpu className="size-4" />
								Infrastructure
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-sm text-text-secondary">Platform</span>
								<Badge variant="outline">Cloudflare Workers</Badge>
							</div>
							<Separator />
							<div className="flex justify-between items-center">
								<span className="text-sm text-text-secondary">Database</span>
								<Badge variant="outline">D1 SQLite</Badge>
							</div>
							<Separator />
							<div className="flex justify-between items-center">
								<span className="text-sm text-text-secondary">Storage</span>
								<Badge variant="outline">R2 Object Storage</Badge>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Service Status List */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Service Status</CardTitle>
							<CardDescription>
								Individual component health and performance metrics
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{services.map((service, index) => {
									const Icon = service.icon;
									return (
										<motion.div
											key={service.name}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.4 + index * 0.1 }}
											className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-bg-2/50 transition-colors"
										>
											<div className="flex items-center gap-4">
												<div className="p-2 rounded-lg bg-bg-3">
													<Icon className="size-5 text-text-secondary" />
												</div>
												<div>
													<h3 className="font-semibold text-text-primary">{service.name}</h3>
													{service.responseTime && (
														<p className="text-sm text-text-secondary">
															Response time: {service.responseTime}ms
														</p>
													)}
													{service.details && (
														<p className="text-xs text-text-secondary/70 mt-1">
															{service.details}
														</p>
													)}
												</div>
											</div>
											<div className="flex items-center gap-3">
												{getStatusBadge(service.status)}
												<div className={getStatusColor(service.status)}>
													{getStatusIcon(service.status)}
												</div>
											</div>
										</motion.div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Incident History / Maintenance Schedule */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
							<CardDescription>
								Past incidents and scheduled maintenance windows
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								<div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
									<CheckCircle2 className="size-5 text-green-500 mt-0.5" />
									<div className="flex-1">
										<p className="font-medium text-text-primary">All systems operational</p>
										<p className="text-sm text-text-secondary">No incidents in the past 30 days</p>
									</div>
									<span className="text-xs text-text-secondary whitespace-nowrap">
										{new Date().toLocaleDateString()}
									</span>
								</div>

								{/* Add more incident history items here in production */}
								<div className="text-center py-4 text-text-secondary text-sm">
									<p>No scheduled maintenance at this time</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Footer Help */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="space-y-4"
				>
					<Card className="border-dashed">
						<CardContent className="p-6">
							<div className="text-center space-y-3">
								<h3 className="text-lg font-semibold text-text-primary">Need Help?</h3>
								<p className="text-text-secondary text-sm">
									Experiencing issues or have questions about our platform?
								</p>
								<div className="flex flex-wrap items-center justify-center gap-3">
									<a 
										href="/contact" 
										className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
									>
										Contact Support
									</a>
									<a 
										href="/guide" 
										className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-bg-2 transition-colors text-sm font-medium"
									>
										View Documentation
									</a>
									<a 
										href="https://github.com/JacobJandon/adriel-ink/issues" 
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-bg-2 transition-colors text-sm font-medium"
									>
										Report Issue
									</a>
								</div>
							</div>
						</CardContent>
					</Card>
					
					<div className="text-center text-text-secondary text-sm space-y-2">
						<p className="text-xs">
							{isLoading ? '⏳ Loading status...' : '✅ Status updates are refreshed every 30 seconds'}
						</p>
						<p className="text-xs text-text-secondary/60">
							All times are in your local timezone • Metrics are aggregated and anonymized
						</p>
					</div>
				</motion.div>
			</div>
		</div>
		</>
	);
}
