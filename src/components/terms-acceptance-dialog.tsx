import { useState } from "react";
import { Sparkles } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsAcceptanceDialogProps {
	open: boolean;
	onAccept: () => void;
}

export function TermsAcceptanceDialog({
	open,
	onAccept,
}: TermsAcceptanceDialogProps) {
	const [acceptedTerms, setAcceptedTerms] = useState(false);

	const handleAccept = () => {
		if (acceptedTerms) {
			onAccept();
		}
	};

	return (
		<Dialog open={open} onOpenChange={() => {}}>
			<DialogContent className="max-w-lg" showCloseButton={false}>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-xl">
						<Sparkles className="h-6 w-6 text-blue-500" />
						Welcome to Adriel AI
					</DialogTitle>
					<DialogDescription className="text-base pt-2">
						Get started building with AI assistance
					</DialogDescription>
			</DialogHeader>

			<div className="space-y-4 py-4">
				{/* Quick Info */}
				<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
					<p className="text-sm text-blue-300">
						<strong>Early Development & Open Community:</strong> This platform is being 
						developed, upgraded, and debugged collaboratively by the community. 
						Expect bugs, rapid improvements, and your contributions to matter!
					</p>
				</div>

				{/* Simple Notice */}
				<div className="space-y-3 text-sm text-muted-foreground">
					<p>
						By using Adriel AI, you understand that:
					</p>
					<ul className="space-y-1.5 ml-4">
						<li>• The AI may generate code that needs review and testing</li>
						<li>• Features are being actively developed, upgraded, and debugged by the community</li>
						<li>• You should backup your work regularly</li>
						<li>• You're responsible for reviewing AI-generated code</li>
						<li>• You're part of a collaborative vibe coding experience</li>
					</ul>
				</div>
			</div>				<DialogFooter className="flex-col sm:flex-col gap-3">
					<div className="flex items-start space-x-3">
						<Checkbox
							id="terms"
							checked={acceptedTerms}
							onCheckedChange={(checked) =>
								setAcceptedTerms(checked as boolean)
							}
						/>
						<Label
							htmlFor="terms"
							className="text-sm font-normal leading-relaxed cursor-pointer"
						>
							I agree to the{" "}
							<a
								href="/terms"
								className="text-blue-500 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Terms of Service
							</a>{" "}
							and{" "}
							<a
								href="/privacy"
								className="text-blue-500 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Privacy Policy
							</a>
						</Label>
					</div>

					<Button
						onClick={handleAccept}
						disabled={!acceptedTerms}
						className="w-full"
						size="lg"
					>
						{acceptedTerms ? "Get Started" : "Please Accept Terms"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
