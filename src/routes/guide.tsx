import { Lightbulb, Zap, RefreshCw, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GuidePage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-bg-1 via-bg-2 to-bg-3">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-text-primary mb-3 flex items-center gap-3">
						<Lightbulb className="h-10 w-10 text-blue-500" />
						Guide & Help
					</h1>
					<p className="text-lg text-text-secondary">
						Learn how to use Adriel AI effectively and troubleshoot common issues
					</p>
				</div>

				<ScrollArea className="h-[calc(100vh-200px)]">
					<div className="space-y-8 pr-4">
						{/* Basic Usage */}
						<section className="bg-bg-2 border border-border-primary rounded-lg p-6">
							<h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
								<Lightbulb className="h-6 w-6 text-blue-500" />
								Basic Usage
							</h2>
							<div className="space-y-3 text-text-secondary">
								<p>
									<strong>1. Be specific:</strong> Instead of "make a website",
									try "create a portfolio website with a hero section, about me,
									and contact form"
								</p>
								<p>
									<strong>2. Iterate gradually:</strong> Start simple, then add
									features one at a time
								</p>
								<p>
									<strong>3. Review changes:</strong> Always check the AI's code
									before deploying
								</p>
								<p>
									<strong>4. Use chat history:</strong> Reference previous
									features when adding new ones
								</p>
							</div>
						</section>

						{/* Example Prompts */}
						<section className="bg-bg-2 border border-border-primary rounded-lg p-6">
							<h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
								<Zap className="h-6 w-6 text-yellow-500" />
								Example Prompts
							</h2>
							<div className="space-y-4">
								<div>
									<p className="text-green-400 font-medium mb-1">
										✓ Good Example:
									</p>
									<p className="text-text-secondary">
										"Create a todo app with add, delete, and mark as complete
										features. Use a clean, modern design with a blue color
										scheme."
									</p>
								</div>
								<div>
									<p className="text-red-400 font-medium mb-1">✗ Too Vague:</p>
									<p className="text-text-secondary">
										"Make something cool" - The AI needs specific requirements
									</p>
								</div>
								<div>
									<p className="text-green-400 font-medium mb-1">
										✓ Good Example:
									</p>
									<p className="text-text-secondary">
										"Add a dark mode toggle button to the top right corner that
										switches between light and dark themes"
									</p>
								</div>
							</div>
						</section>

						{/* Troubleshooting */}
						<section className="bg-bg-2 border border-border-primary rounded-lg p-6">
							<h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
								<RefreshCw className="h-6 w-6 text-orange-500" />
								Troubleshooting
							</h2>
							<div className="space-y-4 text-text-secondary">
								<div>
									<p className="font-semibold text-text-primary mb-2">
										Preview not loading?
									</p>
									<p>
										Tell the AI: <code className="bg-bg-3 px-2 py-1 rounded">"Finish phase 1"</code> or{" "}
										<code className="bg-bg-3 px-2 py-1 rounded">"Deploy the preview now"</code>
									</p>
								</div>
								<div>
									<p className="font-semibold text-text-primary mb-2">
										Something not working?
									</p>
									<p>
										Describe what you expected vs. what happened. Example: "The
										button should submit the form, but clicking it does nothing"
									</p>
								</div>
								<div>
									<p className="font-semibold text-text-primary mb-2">
										Code taking too long?
									</p>
									<p>
										Break your request into smaller steps, or ask for a status
										update
									</p>
								</div>
							</div>
						</section>

						{/* Best Practices */}
						<section className="bg-bg-2 border border-border-primary rounded-lg p-6">
							<h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
							<ol className="space-y-2 text-text-secondary list-decimal list-inside">
								<li>Start with a clear project description</li>
								<li>Add features incrementally rather than all at once</li>
								<li>Test each feature before adding the next one</li>
								<li>Be patient - complex features take time to generate</li>
								<li>
									Save your work frequently by deploying or exporting to GitHub
								</li>
							</ol>
						</section>

						{/* Tips & Tricks */}
						<section className="bg-bg-2 border border-border-primary rounded-lg p-6">
							<h2 className="text-2xl font-semibold mb-4">Tips & Tricks</h2>
							<ul className="space-y-2 text-text-secondary">
								<li>
									<strong>•</strong> You can attach images to describe UI layouts
								</li>
								<li>
									<strong>•</strong> Reference specific files when making
									changes: "Update the Header.jsx file"
								</li>
								<li>
									<strong>•</strong> Use the file explorer to browse generated
									code
								</li>
								<li>
									<strong>•</strong> The preview updates automatically as code is
									generated
								</li>
								<li>
									<strong>•</strong> You can deploy your app at any time to get
									a shareable link
								</li>
							</ul>
						</section>

						{/* Early Access Notice */}
						<section className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
							<div className="flex items-start gap-3">
								<AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-500 shrink-0 mt-1" />
								<div className="space-y-3">
								<h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-200">
									🚧 Early Development • Open Community
								</h3>
								<p className="text-sm text-yellow-800 dark:text-yellow-300">
									Adriel AI is being developed, upgraded, and debugged collaboratively by the community.
								You may encounter bugs, incomplete features, or service interruptions. 
								Always review AI-generated code and backup your work regularly.
									</p>
									<ul className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1 ml-4">
										<li>• The AI may generate code with bugs or errors</li>
									<li>• Features are actively being developed, upgraded, and debugged by the community</li>
									<li>• Response times may vary depending on system load</li>
									<li>
										• Breaking changes may occur as we improve the platform
									</li>
									<li>• Your feedback, bug reports, and contributions shape what we build</li>
									</ul>
								</div>
							</div>
						</section>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
