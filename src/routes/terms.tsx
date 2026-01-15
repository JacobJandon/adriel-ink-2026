import CloudflareLogo from '@/assets/provider-logos/cloudflare.svg?react';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="doc-page card max-w-4xl mx-auto p-4 sm:p-6 md:p-8"
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">Terms of Service</h1>
  <p className="text-text-tertiary mb-6 text-sm">Last updated: November 22, 2025</p>

      <div className="prose prose-invert max-w-none text-sm sm:text-base">
        <h2>1. Overview</h2>
        <p>
          These Terms of Service ("Terms") govern your access to and use of Adriel AI (the "Service"), an AI-powered code 
          generation and development platform. By accessing or using the Service, you agree to be bound by these Terms. 
          If you do not agree, do not use the Service.
        </p>

        <h2>2. Eligibility & Accounts</h2>
        <p>
          You must be at least 18 years old and legally able to form a binding contract to use the Service. You are responsible 
          for maintaining the security of your account credentials and for all activity that occurs under your account. You must 
          notify us immediately of any unauthorized access or security breach.
        </p>

        <h2>3. Subscription Plans and Billing</h2>
        <h3 className="text-base font-semibold mt-4">3.1 Service Tiers</h3>
        <p>
          We offer multiple subscription tiers (Free, Starter, Neural, Premium) with varying usage limits for AI requests, 
          tokens, and features. Current pricing and limits are displayed on our pricing page and in your account dashboard.
        </p>
        
        <h3 className="text-base font-semibold mt-4">3.2 Usage Limits and Quotas</h3>
        <p>
          Each tier includes monthly and hourly quotas for AI requests, token usage, and AI spending. If you exceed your 
          plan limits, the Service may temporarily restrict access to AI features until your quota resets or you upgrade 
          your plan. We track usage in real-time and provide quota monitoring in your account dashboard.
        </p>

        <h3 className="text-base font-semibold mt-4">3.3 Billing and Payments</h3>
        <p>
          Paid subscriptions are billed monthly in advance. You authorize us to charge your payment method on file for all 
          applicable fees. If payment fails, we may suspend or terminate your access to paid features. All fees are 
          non-refundable except as required by law or explicitly stated in these Terms.
        </p>

        <h3 className="text-base font-semibold mt-4">3.4 Plan Changes and Cancellation</h3>
        <p>
          You may upgrade, downgrade, or cancel your subscription at any time through your account settings. Plan changes 
          take effect at the start of the next billing period. Upon cancellation, you retain access to paid features through 
          the end of your current billing period, after which your account reverts to the Free tier.
        </p>

        <h2>4. Acceptable Use</h2>
        <ul>
          <li>Do not use the Service for illegal, harmful, fraudulent, or abusive purposes.</li>
          <li>Do not infringe intellectual property rights, privacy rights, or other legal rights of any party.</li>
          <li>Do not attempt to reverse engineer, probe, or interfere with the Service's infrastructure, security, or other users.</li>
          <li>Do not use automated systems to abuse API limits or circumvent usage quotas.</li>
          <li>Do not generate or distribute content that is defamatory, obscene, hateful, or violates applicable laws.</li>
        </ul>
        <p>
          We reserve the right to investigate violations and take appropriate action, including account suspension or termination.
        </p>

        <h2>5. Content & Ownership</h2>
        <h3 className="text-base font-semibold mt-4">5.1 Your Content</h3>
        <p>
          You retain ownership of your input content (prompts, code, files, images) and any generated outputs, subject to 
          applicable law and the policies of third-party AI model providers. You grant us a limited, non-exclusive license 
          to process your content solely to provide, secure, and improve the Service.
        </p>

        <h3 className="text-base font-semibold mt-4">5.2 Generated Code and Outputs</h3>
        <p>
          AI-generated code and outputs are provided "as is" without warranty. You are solely responsible for reviewing, 
          testing, and validating all generated content before use in production. We are not liable for any issues, bugs, 
          security vulnerabilities, or intellectual property concerns in generated outputs.
        </p>

        <h3 className="text-base font-semibold mt-4">5.3 Public Projects</h3>
        <p>
          If you choose to make projects public, you grant other users the right to view and interact with those projects 
          according to the visibility settings you configure. You are responsible for ensuring you have the right to share 
          any content in public projects.
        </p>

        <h2>6. Third-Party Services and Providers</h2>
        <h3 className="text-base font-semibold mt-4">6.1 Infrastructure and Hosting</h3>
        <p>
          We use Cloudflare Workers, D1, R2, and AI Gateway to operate the Service. Your use is subject to Cloudflare's 
          terms and policies. We select providers we believe are reputable and align with our security standards.
        </p>
        
        <div className="flex items-center gap-2 my-4 p-4 bg-bg-4/40 rounded-lg border border-border-primary/20">
          <span className="text-sm text-text-secondary">Infrastructure powered with</span>
          <CloudflareLogo className="h-5" />
          <span className="text-xs text-text-tertiary ml-auto">Workers • D1 • R2 • AI Gateway</span>
        </div>

        <h3 className="text-base font-semibold mt-4">6.2 AI Model Providers</h3>
        <p>
          The Service integrates with multiple AI model providers (OpenAI, Anthropic, Google, Cerebras, and others). 
          Your use of AI features may be subject to their respective terms, usage policies, and content guidelines. 
          We do not control these third-party services and are not responsible for their availability, performance, or policies.
        </p>

        <h3 className="text-base font-semibold mt-4">6.3 Payment Processing</h3>
        <p>
          Subscription payments are processed through Stripe. Your payment information is handled directly by Stripe and is 
          subject to Stripe's terms and privacy policy. We do not store your full payment card information on our servers.
        </p>

        <h2>7. AI Features and Outputs</h2>
        <h3 className="text-base font-semibold mt-4">7.1 AI-Generated Content</h3>
        <p>
          The Service uses AI models to generate code, text, and other outputs based on your prompts. AI outputs may be 
          inaccurate, incomplete, insecure, or contain errors. You must review, test, and validate all outputs before use 
          in production environments.
        </p>

        <h3 className="text-base font-semibold mt-4">7.2 No Guarantee of Accuracy</h3>
        <p>
          We do not warrant that AI-generated code will be bug-free, secure, performant, or suitable for any particular 
          purpose. You are solely responsible for security reviews, testing, and quality assurance of generated content.
        </p>

        <h3 className="text-base font-semibold mt-4">7.3 Model Behavior and Quota Impact</h3>
        <p>
          AI models may occasionally produce unexpected, biased, or inappropriate outputs. We implement safeguards where 
          possible, but cannot guarantee all outputs will meet your expectations. All AI requests count toward your usage 
          quotas based on token consumption and model costs.
        </p>

        <h2>8. Usage Monitoring and Enforcement</h2>
        <p>
          We monitor usage to enforce quota limits, detect abuse, and maintain Service quality. We track:
        </p>
        <ul>
          <li>Number of AI requests per hour and per month</li>
          <li>Token consumption (input and output tokens)</li>
          <li>AI model costs and spending</li>
          <li>Request success rates and error patterns</li>
        </ul>
        <p>
          This data is used for billing, quota enforcement, abuse prevention, and service improvements. You can view your 
          current usage in your account dashboard at any time.
        </p>

        <h2>9. Disclaimer</h2>
        <p>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
          BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY. 
          We do not warrant that the Service will be uninterrupted, error-free, secure, or that outputs will be accurate or 
          fit for your intended use.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, ADRIEL AI AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND PARTNERS WILL NOT 
          BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT 
          LIMITED TO DAMAGES FOR LOSS OF PROFITS, DATA, GOODWILL, USE, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
        </p>
        <ul>
          <li>Your use or inability to use the Service</li>
          <li>Any AI-generated outputs or content</li>
          <li>Unauthorized access to or alteration of your data</li>
          <li>Third-party conduct or content on the Service</li>
          <li>Any other matter relating to the Service</li>
        </ul>
        <p>
          Our total liability will not exceed the amount you paid us in the 12 months preceding the claim, or $100, 
          whichever is greater.
        </p>

        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Adriel AI from any claims, damages, losses, liabilities, and expenses 
          (including legal fees) arising from: (a) your use of the Service; (b) your violation of these Terms; (c) your 
          violation of any rights of another party; or (d) any content you submit or generate using the Service.
        </p>

        <h2>12. Termination</h2>
        <h3 className="text-base font-semibold mt-4">12.1 Termination by You</h3>
        <p>
          You may cancel your account at any time through your account settings or by contacting support. Upon cancellation, 
          you will have access to paid features through the end of your current billing period. No refunds are provided for 
          partial billing periods.
        </p>

        <h3 className="text-base font-semibold mt-4">12.2 Termination by Us</h3>
        <p>
          We may suspend or terminate your access to the Service at any time, with or without notice, for any reason, 
          including but not limited to: violation of these Terms, fraudulent activity, abuse of the Service, quota circumvention 
          attempts, failure to pay, or if we cease operations. Upon termination, your right to use the Service ceases immediately.
        </p>

        <h3 className="text-base font-semibold mt-4">12.3 Effect of Termination</h3>
        <p>
          Upon termination, you lose access to your account data, projects, and any subscription benefits. We may retain 
          certain data as required by law or for legitimate business purposes. Sections of these Terms that by their nature 
          should survive termination (including payment obligations, disclaimers, and limitations of liability) will remain in effect.
        </p>

        <h2>13. Dispute Resolution</h2>
        <p>
          Any disputes arising from these Terms or the Service will be governed by the laws of the jurisdiction where 
          Adriel AI is registered, without regard to conflict of law principles. You agree to submit to the exclusive 
          jurisdiction of courts in that jurisdiction. For any dispute with a total claim value under $10,000, either party 
          may elect binding arbitration.
        </p>

        <h2>14. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time to reflect changes in our Service, legal requirements, or business 
          practices. Material changes will be posted here with an updated "Last updated" date. We may also notify you via 
          email or through the Service. Continued use of the Service after changes constitutes acceptance of the modified Terms. 
          We encourage you to review these Terms periodically.
        </p>

        <h2>15. General Provisions</h2>
        <ul>
          <li><strong>Assignment:</strong> You may not assign these Terms without our prior written consent. We may assign them without restriction.</li>
          <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Adriel AI regarding the Service and supersede all prior agreements.</li>
          <li><strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in full force and effect.</li>
          <li><strong>Waiver:</strong> Failure to enforce any provision does not constitute a waiver of that provision or any other provision.</li>
          <li><strong>Force Majeure:</strong> We are not liable for delays or failures due to circumstances beyond our reasonable control.</li>
        </ul>

        <h2>16. Contact Information</h2>
        <p>
          Questions about these Terms of Service? Contact us at{' '}
          <a className="underline hover:text-blue-400 transition-colors" href="mailto:legal@adriel.ink">legal@adriel.ink</a>.
        </p>
        <p className="text-sm text-text-tertiary mt-2">
          For technical support, visit{' '}
          <a className="underline hover:text-blue-400 transition-colors" href="mailto:support@adriel.ink">support@adriel.ink</a>.
        </p>
      </div>
    </motion.div>
  );
}
