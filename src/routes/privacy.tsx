import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="doc-page card max-w-4xl mx-auto p-4 sm:p-6 md:p-8"
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">Privacy Policy</h1>
      <p className="text-text-tertiary mb-6 text-sm">Last updated: November 22, 2025</p>

      <div className="prose prose-invert max-w-none text-sm sm:text-base">
        <h2>1. Overview</h2>
        <p>
          This Privacy Policy explains how Adriel AI ("we", "our", "us") collects, uses, and protects your information when you use the
          Service. By using the Service, you consent to the practices described in this Policy.
        </p>

        <h2>2. Information We Collect</h2>
        <h3 className="text-base font-semibold mt-4">2.1 Account Information</h3>
        <ul>
          <li>Email address, display name, and authentication credentials when you sign up</li>
          <li>Subscription tier and plan information</li>
          <li>Account preferences and settings</li>
        </ul>

        <h3 className="text-base font-semibold mt-4">2.2 Content and Usage Data</h3>
        <ul>
          <li>Content you submit (prompts, code, files, images) and AI-generated outputs</li>
          <li>Project data and workspace configurations</li>
          <li>AI model selections and provider preferences</li>
        </ul>

        <h3 className="text-base font-semibold mt-4">2.3 Usage Analytics and Monitoring</h3>
        <ul>
          <li>Number of AI requests per hour and per month</li>
          <li>Token consumption (input and output tokens) per request and model</li>
          <li>AI model costs and spending per request</li>
          <li>Request success rates, error patterns, and response times</li>
          <li>Feature usage patterns and user interactions</li>
        </ul>

        <h3 className="text-base font-semibold mt-4">2.4 Payment and Billing Information</h3>
        <ul>
          <li>Payment method details (processed and stored securely by Stripe)</li>
          <li>Billing address and tax information</li>
          <li>Transaction history and invoice records</li>
          <li>Subscription status and billing period dates</li>
        </ul>

        <h3 className="text-base font-semibold mt-4">2.5 Technical and Device Information</h3>
        <ul>
          <li>Browser type, version, and operating system</li>
          <li>IP address and geographic location</li>
          <li>Session timestamps and activity logs</li>
          <li>Device identifiers and screen resolution</li>
        </ul>

        <h2>3. How We Use Information</h2>
        <h3 className="text-base font-semibold mt-4">3.1 Service Operations</h3>
        <ul>
          <li>To provide, operate, and maintain the Service</li>
          <li>To process AI requests and deliver generated outputs</li>
          <li>To enforce usage quotas and rate limits</li>
          <li>To monitor Service performance and availability</li>
        </ul>

        <h3 className="text-base font-semibold mt-4">3.2 Billing and Subscription Management</h3>
        <ul>
          <li>To process subscription payments and manage billing</li>
          <li>To track usage against plan limits and quotas</li>
          <li>To calculate costs and generate invoices</li>
          <li>To handle plan upgrades, downgrades, and cancellations</li>
        </ul>

        <h3 className="text-base font-semibold mt-4">3.3 Security and Abuse Prevention</h3>
        <ul>
          <li>To detect and prevent fraud, abuse, and unauthorized access</li>
          <li>To identify quota circumvention attempts</li>
          <li>To investigate security incidents and violations</li>
          <li>To maintain audit logs for compliance purposes</li>
        </ul>

        <h3 className="text-base font-semibold mt-4">3.4 Service Improvements</h3>
        <ul>
          <li>To analyze aggregate usage patterns and trends</li>
          <li>To optimize AI model performance and costs</li>
          <li>To develop new features and improve existing ones</li>
          <li>To provide personalized experiences and recommendations</li>
        </ul>

        <h2>4. Third-Party Services and Model Providers</h2>
        <h3 className="text-base font-semibold mt-4">4.1 Infrastructure Providers</h3>
        <p>
          We use Cloudflare Workers, D1, R2, and AI Gateway to host and operate the Service. These providers process technical 
          data necessary for Service operations, including IP addresses, request metadata, and performance metrics. Data is 
          processed in accordance with Cloudflare's privacy practices.
        </p>

        <h3 className="text-base font-semibold mt-4">4.2 AI Model Providers</h3>
        <p>
          The Service integrates with multiple AI model providers (OpenAI, Anthropic, Google, Cerebras, and others). To provide 
          AI features, your prompts and related context may be sent to these providers, and generated outputs are returned to you. 
          We configure providers to not use your data for model training where possible. Each provider has their own privacy policy 
          governing their handling of your data.
        </p>

        <h3 className="text-base font-semibold mt-4">4.3 Payment Processor</h3>
        <p>
          Subscription payments are processed through Stripe, Inc. Your payment information (credit card details, billing address) 
          is transmitted directly to Stripe and is not stored on our servers. We receive only limited payment information such as 
          the last 4 digits of your card, card brand, and transaction status. Stripe's privacy policy governs their handling of 
          your payment data.
        </p>

        <h3 className="text-base font-semibold mt-4">4.4 Analytics and Monitoring</h3>
        <p>
          We may use analytics services to understand Service usage, performance, and user behavior. These services collect 
          aggregated and anonymized data to help us improve the Service.
        </p>

        <h2>5. AI Model Data Handling</h2>
        <p>
          To provide AI features, prompts and related context are sent to configured model providers, and the resulting outputs 
          are returned to you. We implement the following data handling practices:
        </p>
        <ul>
          <li>We configure providers to not use your prompts or outputs for model training where technically possible</li>
          <li>We retain request logs necessary to operate, secure, and improve the Service</li>
          <li>We may cache responses temporarily to improve performance and reduce costs</li>
          <li>We monitor requests for abuse, security threats, and policy violations</li>
          <li>Premium users using BYOK (Bring Your Own Key) connect directly to providers using their own API keys</li>
        </ul>

        <h2>6. Cookies & Local Storage</h2>
        <p>
          We use cookies and browser local storage to maintain sessions, store preferences, and improve usability. We are committed to transparency and user control over cookie usage.
        </p>
        
        <h3 className="text-base font-semibold mt-4">6.1 Types of Cookies We Use</h3>
        <ul>
          <li>
            <strong>Essential Cookies (Required):</strong> These cookies are strictly necessary for the Service to function. They include:
            <ul className="ml-6 mt-2">
              <li>Authentication cookies (HTTP-only, secure) to keep you logged in</li>
              <li>Session management cookies to maintain your active session</li>
              <li>CSRF protection cookies for security</li>
              <li>Access and refresh tokens (HTTP-only) for API authentication</li>
            </ul>
          </li>
          <li>
            <strong>Preference Cookies (Optional):</strong> These cookies remember your choices:
            <ul className="ml-6 mt-2">
              <li>Theme preference (light/dark mode)</li>
              <li>Language and locale settings</li>
              <li>UI layout and workspace preferences</li>
              <li>Editor settings and configurations</li>
            </ul>
          </li>
          <li>
            <strong>Analytics Cookies (Optional):</strong> Help us understand Service usage:
            <ul className="ml-6 mt-2">
              <li>Feature usage patterns and user interactions</li>
              <li>Error tracking and performance monitoring</li>
              <li>Aggregated statistics (anonymized)</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-base font-semibold mt-4">6.2 Cookie Consent and Control</h3>
        <p>
          When you first visit the Service, we display a cookie consent banner. You can:
        </p>
        <ul>
          <li><strong>Accept:</strong> Allow all cookies including essential and optional cookies</li>
          <li><strong>Decline:</strong> Only use essential cookies required for basic functionality (you will be logged out if authenticated)</li>
          <li><strong>Manage:</strong> Change your cookie preferences at any time in your browser settings</li>
        </ul>

        <h3 className="text-base font-semibold mt-4">6.3 Third-Party Cookies</h3>
        <p>
          We do <strong>not</strong> use third-party tracking cookies, advertising cookies, or social media cookies. All cookies are first-party cookies set by our Service.
        </p>

        <h3 className="text-base font-semibold mt-4">6.4 Cookie Lifespan</h3>
        <ul>
          <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
          <li><strong>Authentication cookies:</strong> Valid for 30 days or until logout</li>
          <li><strong>Preference cookies:</strong> Persist until you clear them or change settings</li>
        </ul>

        <h3 className="text-base font-semibold mt-4">6.5 Managing and Deleting Cookies</h3>
        <p>
          You can control cookies through your browser settings:
        </p>
        <ul>
          <li>Most browsers allow you to block or delete cookies</li>
          <li>You can set your browser to notify you when cookies are sent</li>
          <li>Disabling essential cookies may prevent you from using the Service</li>
          <li>To clear your consent choice, delete the "cookie-consent" item from local storage</li>
        </ul>
        <p className="mt-2 text-sm text-text-secondary">
          <strong>Note:</strong> If you decline cookies or clear authentication cookies, you will be logged out and may need to sign in again.
        </p>

        <h2>7. Data Retention</h2>
        <h3 className="text-base font-semibold mt-4">7.1 Account and Content Data</h3>
        <p>
          We retain your account data, projects, and workspace content for as long as your account is active. If you delete your 
          account, we will delete or anonymize your data within 90 days, except where retention is required by law or for 
          legitimate business purposes.
        </p>

        <h3 className="text-base font-semibold mt-4">7.2 Usage and Analytics Data</h3>
        <p>
          Usage logs, request metadata, and analytics data are retained for up to 12 months to enable billing, abuse prevention, 
          and service improvements. Aggregated and anonymized analytics may be retained indefinitely.
        </p>

        <h3 className="text-base font-semibold mt-4">7.3 Billing and Payment Records</h3>
        <p>
          Transaction records, invoices, and payment history are retained for at least 7 years to comply with tax and accounting 
          regulations. This includes subscription history, payment amounts, and billing addresses.
        </p>

        <h3 className="text-base font-semibold mt-4">7.4 Security and Compliance Logs</h3>
        <p>
          Security logs, audit trails, and compliance records may be retained longer as required by law or to defend legal claims.
        </p>

        <h2>8. Your Rights</h2>
        <p>
          Depending on your location, you may have the following rights regarding your personal data:
        </p>
        <ul>
          <li><strong>Access:</strong> Request a copy of personal data we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
          <li><strong>Deletion:</strong> Request deletion of your account and personal data</li>
          <li><strong>Portability:</strong> Request your data in a machine-readable format</li>
          <li><strong>Objection:</strong> Object to certain processing activities</li>
          <li><strong>Restriction:</strong> Request restriction of processing under certain circumstances</li>
        </ul>
        <p>
          To exercise these rights, contact us at{' '}
          <a className="underline hover:text-blue-400 transition-colors" href="mailto:privacy@adriel.ink">privacy@adriel.ink</a>. 
          We will respond within 30 days of your request.
        </p>

        <h2>9. Security</h2>
        <p>
          We implement industry-standard security measures to protect your data, including:
        </p>
        <ul>
          <li>Encryption in transit (TLS/HTTPS) and at rest for sensitive data</li>
          <li>Access controls and authentication requirements</li>
          <li>Regular security assessments and monitoring</li>
          <li>Secure API key storage with encryption</li>
          <li>Rate limiting and abuse detection systems</li>
        </ul>
        <p>
          However, no method of transmission or storage is 100% secure. We cannot guarantee absolute security of your data.
        </p>

        <h2>10. Children's Privacy</h2>
        <p>
          The Service is not directed to children under 18, and we do not knowingly collect information from individuals under 18. 
          If you believe we have collected data from a minor, please contact us immediately.
        </p>

        <h2>11. International Data Transfers</h2>
        <p>
          The Service operates globally using Cloudflare's edge network. Your data may be processed in multiple jurisdictions. 
          We ensure appropriate safeguards are in place for international data transfers in accordance with applicable laws.
        </p>

        <h2>12. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or Service 
          features. Material changes will be posted here with an updated "Last updated" date. We may also notify you via email or 
          through the Service. Continued use after changes constitutes acceptance of the updated Policy.
        </p>

        <h2>13. Contact Information</h2>
        <p>
          Questions about this Privacy Policy or our data practices? Contact us at{' '}
          <a className="underline hover:text-blue-400 transition-colors" href="mailto:privacy@adriel.ink">privacy@adriel.ink</a>.
        </p>
        <p className="text-sm text-text-tertiary mt-2">
          For general inquiries, visit{' '}
          <a className="underline hover:text-blue-400 transition-colors" href="mailto:legal@adriel.ink">legal@adriel.ink</a>.
        </p>
      </div>
    </motion.div>
  );
}
