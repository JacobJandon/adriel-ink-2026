import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function SettingsSecretsSkeleton() {
	return (
		<div className="space-y-3">
			{[1, 2, 3].map((i) => (
				<div
					key={i}
					className="flex items-center justify-between p-4 border rounded-lg bg-bg-4"
				>
					<div className="flex items-center gap-3">
						<Skeleton className="w-8 h-8 rounded-md" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-3 w-24" />
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Skeleton className="h-6 w-16 rounded-full" />
						<Skeleton className="h-8 w-8 rounded" />
					</div>
				</div>
			))}
		</div>
	);
}

export function SettingsSessionsSkeleton() {
	return (
		<div className="space-y-3">
			{[1, 2].map((i) => (
				<div key={i} className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Skeleton className="h-5 w-5 rounded" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-3 w-48" />
						</div>
					</div>
					<Skeleton className="h-8 w-20 rounded" />
				</div>
			))}
		</div>
	);
}

export function SettingsConfigsSkeleton() {
	return (
		<Card>
			<CardContent className="space-y-4 p-6">
				{/* Tabs skeleton */}
				<div className="flex gap-2 border-b pb-2">
					{[1, 2, 3, 4].map((i) => (
						<Skeleton key={i} className="h-8 w-24 rounded" />
					))}
				</div>
				
				{/* Content skeleton */}
				<div className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-10 w-full rounded" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-10 w-full rounded" />
					</div>
					<div className="flex gap-2">
						<Skeleton className="h-9 w-24 rounded" />
						<Skeleton className="h-9 w-24 rounded" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
