import { Outlet } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/auth-context';
import { AuthModalProvider } from './components/auth/AuthModalProvider';
import { ThemeProvider } from './contexts/theme-context';
import { Toaster } from './components/ui/sonner';
import { AppLayout } from './components/layout/app-layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PageTransition } from './components/shared/PageTransition';
import { CookieConsentBanner } from './components/cookie-consent-banner';
import { DiscordReminder } from './components/discord-reminder';

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            <AuthModalProvider>
              <AppLayout>
                <PageTransition>
                  <Outlet />
                </PageTransition>
              </AppLayout>
              <Toaster richColors position="top-right" />
              <CookieConsentBanner />
              <DiscordReminder />
            </AuthModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}