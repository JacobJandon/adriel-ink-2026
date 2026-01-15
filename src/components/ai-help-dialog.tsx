import { AlertCircle, Lightbulb, Zap, RefreshCw, Check } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIHelpDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function AIHelpDialog({ open, onOpenChange }: AIHelpDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[80vh]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-xl">
						<Lightbulb className="h-6 w-6 text-yellow-500" />
						How to Use the AI
					</DialogTitle>
					<DialogDescription>
						Tips and best practices for getting the most out of your AI
						assistant
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className="h-[500px] pr-4">
					<div className="space-y-6">
						{/* Basic Usage */}
						<section>
							<h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
								<Zap className="h-5 w-5 text-blue-500" />
								Basic Usage
							</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li className="flex gap-2">
									<Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
									<span>
										<strong>Be specific:</strong> Tell the AI exactly what you
										want to build
									</span>
								</li>
								<li className="flex gap-2">
									<Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
									<span>
										<strong>Start simple:</strong> Begin with a basic version,
										then add features
									</span>
								</li>
								<li className="flex gap-2">
									<Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
									<span>
										<strong>Describe features:</strong> List out specific
										functionality you need
									</span>
								</li>
								<li className="flex gap-2">
									<Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
									<span>
										<strong>Iterate:</strong> Make changes step by step instead
										of all at once
									</span>
								</li>
							</ul>
						</section>

						{/* Example Prompts */}
						<section>
							<h3 className="text-lg font-semibold mb-3">
								Example Prompts
							</h3>
							<div className="space-y-3">
								<div className="bg-muted p-3 rounded-lg">
									<p className="text-sm font-medium mb-1">
										✅ Good: Specific and clear
									</p>
									<p className="text-sm text-muted-foreground italic">
										"Create a todo app with the ability to add, delete, and mark
										tasks as complete. Use a clean modern design."
									</p>
								</div>
								<div className="bg-muted p-3 rounded-lg">
									<p className="text-sm font-medium mb-1">
										❌ Avoid: Too vague
									</p>
									<p className="text-sm text-muted-foreground italic">
										"Make an app"
									</p>
								</div>
							</div>
						</section>

						{/* Troubleshooting */}
						<section>
							<h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
								<RefreshCw className="h-5 w-5 text-orange-500" />
								Troubleshooting
							</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-semibold mb-2">
										Preview not loading?
									</h4>
									<ul className="space-y-1 text-sm text-muted-foreground ml-4">
										<li>
											• Tell the AI: <strong>"Finish phase 1"</strong> or{" "}
											<strong>"Deploy the preview now"</strong>
										</li>
										<li>
											• Wait 10-15 seconds for the sandbox to initialize
										</li>
										<li>• Check if the AI is still generating code</li>
									</ul>
								</div>

								<div>
									<h4 className="text-sm font-semibold mb-2">
										Something not working?
									</h4>
									<ul className="space-y-1 text-sm text-muted-foreground ml-4">
										<li>
											• Describe the issue clearly: "The button doesn't work"
										</li>
										<li>
											• Ask the AI to fix it: "Can you debug the save button?"
										</li>
										<li>
											• Try refreshing the preview after code changes
										</li>
									</ul>
								</div>

								<div>
									<h4 className="text-sm font-semibold mb-2">
										Code taking too long?
									</h4>
									<ul className="space-y-1 text-sm text-muted-foreground ml-4">
										<li>
											• Say: <strong>"Let's move on"</strong> or{" "}
											<strong>"Deploy what we have"</strong>
										</li>
										<li>• Break large changes into smaller steps</li>
										<li>• Avoid asking for too many changes at once</li>
									</ul>
								</div>
							</div>
						</section>

						{/* Best Practices */}
						<section>
							<h3 className="text-lg font-semibold mb-3">Best Practices</h3>
							<div className="space-y-2 text-sm text-muted-foreground">
								<div className="flex gap-2">
									<span className="font-semibold text-foreground shrink-0">
										1.
									</span>
									<span>
										<strong>Save often:</strong> Test your app regularly during
										development
									</span>
								</div>
								<div className="flex gap-2">
									<span className="font-semibold text-foreground shrink-0">
										2.
									</span>
									<span>
										<strong>One feature at a time:</strong> Don't overwhelm the
										AI with multiple requests
									</span>
								</div>
								<div className="flex gap-2">
									<span className="font-semibold text-foreground shrink-0">
										3.
									</span>
									<span>
										<strong>Be patient:</strong> Complex features take time to
										generate
									</span>
								</div>
								<div className="flex gap-2">
									<span className="font-semibold text-foreground shrink-0">
										4.
									</span>
									<span>
										<strong>Review code:</strong> Check the "Files" tab to see
										what's being built
									</span>
								</div>
								<div className="flex gap-2">
									<span className="font-semibold text-foreground shrink-0">
										5.
									</span>
									<span>
										<strong>Ask questions:</strong> If confused, ask the AI to
										explain what it's doing
									</span>
								</div>
							</div>
						</section>

						{/* Tips & Tricks */}
						<section>
							<h3 className="text-lg font-semibold mb-3">Tips & Tricks</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									💡 <strong>Use templates:</strong> Start with a template for
									faster development
								</li>
								<li>
									💡 <strong>Reference examples:</strong> Say "like Twitter" or
									"similar to Instagram"
								</li>
								<li>
									💡 <strong>Style requests:</strong> Specify colors, layouts, or
									design preferences
								</li>
								<li>
									💡 <strong>Ask for explanations:</strong> Request code
									comments or documentation
								</li>
								<li>
									💡 <strong>Undo changes:</strong> Say "revert that" or "go
									back" if needed
								</li>
							</ul>
						</section>

						{/* Warning */}
						<section className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
							<div className="flex gap-2">
								<AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
								<div className="space-y-2">
								<h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
									Early Development • Open Community
								</h3>
								<p className="text-xs text-yellow-800 dark:text-yellow-300">
									This platform is being <strong>developed, upgraded, and debugged</strong> collaboratively by the community.
									You might encounter:
									</p>
									<ul className="text-xs text-yellow-800 dark:text-yellow-300 space-y-1 ml-4">
										<li>• Code that needs debugging or refinement</li>
										<li>• Features that don't work exactly as expected</li>
										<li>• Occasional errors or unexpected behavior</li>
										<li>• Limitations in complex functionality</li>
									</ul>
								<p className="text-xs text-yellow-800 dark:text-yellow-300 mt-2">
									<strong>We're all vibing and coding together!</strong> Your feedback, bug reports, 
									and contributions help us develop and upgrade the platform.
								</p>
								</div>
							</div>
						</section>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
