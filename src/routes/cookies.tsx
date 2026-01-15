import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, Info } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="doc-page card max-w-4xl mx-auto p-4 sm:p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-3">
        <Cookie className="w-8 h-8 text-amber-500" />
        <h1 className="text-2xl sm:text-3xl font-bold">Cookie Policy</h1>
      </div>
      <p className="text-text-tertiary mb-6 text-sm">Last updated: November 27, 2025</p>

      <div className="prose prose-invert max-w-none text-sm sm:text-base">
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit, 
          such as your preferred settings, login status, and other data to make your experience better.
        </p>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 my-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-2">We Respect Your Privacy</p>
              <ul className="space-y-1 text-sm">
                <li>✓ We use only essential cookies for core functionality</li>
                <li>✓ No third-party tracking or advertising cookies</li>
                <li>✓ No social media cookies</li>
                <li>✓ Full transparency and control over your data</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Types of Cookies We Use</h2>

        <div className="space-y-6">
          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold m-0">Essential Cookies (Required)</h3>
            </div>
            <p className="mb-3">
              These cookies are absolutely necessary for the Service to function properly. Without these cookies, you cannot use the Service.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">Cookie Name</th>
                  <th className="text-left py-2">Purpose</th>
                  <th className="text-left py-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-mono text-xs">accessToken</td>
                  <td className="py-2">Authenticates your identity (HTTP-only, secure)</td>
                  <td className="py-2">30 days</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-mono text-xs">refreshToken</td>
                  <td className="py-2">Refreshes your session automatically (HTTP-only, secure)</td>
                  <td className="py-2">90 days</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-mono text-xs">csrf-token</td>
                  <td className="py-2">Protects against CSRF attacks</td>
                  <td className="py-2">Session</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">session-id</td>
                  <td className="py-2">Maintains your active session</td>
                  <td className="py-2">Session</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold m-0">Preference Cookies (Optional)</h3>
            </div>
            <p className="mb-3">
              These cookies remember your choices and preferences to provide a personalized experience.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">Storage Key</th>
                  <th className="text-left py-2">Purpose</th>
                  <th className="text-left py-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-mono text-xs">theme</td>
                  <td className="py-2">Your preferred color theme (light/dark)</td>
                  <td className="py-2">Persistent</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-mono text-xs">editor-settings</td>
                  <td className="py-2">Code editor preferences (font size, tab width, etc.)</td>
                  <td className="py-2">Persistent</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-mono text-xs">sidebar-state</td>
                  <td className="py-2">Sidebar collapsed/expanded state</td>
                  <td className="py-2">Persistent</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-xs">cookie-consent</td>
                  <td className="py-2">Your cookie consent choice</td>
                  <td className="py-2">Persistent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2>What We Don't Use</h2>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 my-4">
          <p className="font-semibold mb-2">❌ We explicitly do NOT use:</p>
          <ul className="space-y-1">
            <li>Third-party advertising cookies</li>
            <li>Social media tracking pixels</li>
            <li>Cross-site tracking cookies</li>
            <li>Behavioral profiling cookies</li>
            <li>Fingerprinting techniques</li>
          </ul>
        </div>

        <h2>Cookie Consent</h2>
        <p>
          When you first visit Adriel AI, we display a cookie consent banner with two options:
        </p>
        <ul>
          <li>
            <strong>Accept Cookies:</strong> Allows us to use both essential and preference cookies for the best experience
          </li>
          <li>
            <strong>Decline Cookies:</strong> Only uses essential cookies (you'll be logged out if currently authenticated)
          </li>
        </ul>
        <p className="text-sm text-text-secondary mt-2">
          Your choice is stored in local storage and will be remembered on future visits. You can change your choice at any time 
          by clearing your browser's local storage or cookies.
        </p>

        <h2>Managing Your Cookie Preferences</h2>
        
        <h3 className="text-base font-semibold mt-4">Browser Settings</h3>
        <p>
          Most browsers allow you to control cookies through their settings. You can:
        </p>
        <ul>
          <li>Block all cookies</li>
          <li>Allow only first-party cookies</li>
          <li>Delete cookies when you close the browser</li>
          <li>Get notified when cookies are set</li>
        </ul>
        
        <h3 className="text-base font-semibold mt-4">Browser-Specific Instructions</h3>
        <ul>
          <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
          <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
          <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
        </ul>

        <h3 className="text-base font-semibold mt-4">Impact of Blocking Cookies</h3>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 my-4">
          <p className="font-semibold mb-2">⚠️ Important Notice:</p>
          <p>
            If you block or delete essential cookies, you will not be able to use the Service. Essential cookies are required for:
          </p>
          <ul className="mt-2">
            <li>Logging in and maintaining your session</li>
            <li>Creating and managing projects</li>
            <li>Making AI requests</li>
            <li>Accessing your account settings</li>
          </ul>
        </div>

        <h2>HTTP-Only and Secure Cookies</h2>
        <p>
          For security, our authentication cookies are marked as:
        </p>
        <ul>
          <li><strong>HTTP-Only:</strong> Cannot be accessed by JavaScript, protecting against XSS attacks</li>
          <li><strong>Secure:</strong> Only transmitted over HTTPS connections</li>
          <li><strong>SameSite:</strong> Protection against CSRF attacks</li>
        </ul>

        <h2>Data Protection and GDPR</h2>
        <p>
          Our cookie practices comply with:
        </p>
        <ul>
          <li>EU General Data Protection Regulation (GDPR)</li>
          <li>California Consumer Privacy Act (CCPA)</li>
          <li>ePrivacy Directive (Cookie Law)</li>
        </ul>
        <p>
          We obtain your consent before setting non-essential cookies and provide clear information about cookie purposes.
        </p>

        <h2>Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy to reflect changes in our practices or legal requirements. The "Last updated" date at 
          the top indicates when changes were last made. Material changes will be communicated through the Service or via email.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about our use of cookies, please contact us:
        </p>
        <ul>
          <li>Email: <a className="underline hover:text-blue-400 transition-colors" href="mailto:privacy@adriel.ink">privacy@adriel.ink</a></li>
          <li>Website: <a className="underline hover:text-blue-400 transition-colors" href="https://adriel.ink">https://adriel.ink</a></li>
        </ul>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-5 mt-8">
          <p className="font-semibold mb-2">🍪 Summary</p>
          <p className="text-sm">
            We use cookies responsibly and transparently. Essential cookies keep you logged in and secure. Preference cookies 
            remember your settings. We don't use tracking or advertising cookies. You have full control over your cookie preferences. 
            Questions? Contact us at <a className="underline hover:text-blue-400 transition-colors" href="mailto:privacy@adriel.ink">privacy@adriel.ink</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
