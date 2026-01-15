import React from 'react';
import { useLocation } from 'react-router';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { GlobalHeader } from './global-header';
import { AppsDataProvider } from '@/contexts/apps-data-context';
import clsx from 'clsx';
import { motion, useAnimationControls } from 'framer-motion';
import { X } from 'lucide-react';
import { CloudflareLogo } from '@/components/icons/logos';

interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { pathname } = useLocation();
  const [isFooterVisible, setIsFooterVisible] = React.useState(true);
  const [isHoveringBottom, setIsHoveringBottom] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(() => {
    // Remember dismissal state in sessionStorage
    return sessionStorage.getItem('footer-dismissed') === 'true';
  });
  const controls = useAnimationControls();
  
  // Hide legal/footer overlays on more pages where it's not needed
  const hideFooter = 
    isDismissed ||
    pathname.startsWith('/chat/') || 
    pathname.startsWith('/app/') ||
    pathname.startsWith('/apps') ||
    pathname === '/profile' ||
    pathname === '/settings' ||
    pathname === '/usage' ||
    pathname === '/status' ||
    pathname === '/error';

  // Auto-hide footer after 8 seconds, show on hover at bottom of screen
  React.useEffect(() => {
    if (hideFooter) return;
    
    // Initial animation
    controls.start({ 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }
    });

    // Auto-hide after 8 seconds
    const timer = setTimeout(() => {
      if (!isHoveringBottom) {
        setIsFooterVisible(false);
        controls.start({ 
          y: 80, 
          opacity: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        });
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [hideFooter, pathname, controls, isHoveringBottom]);

  // Detect mouse near bottom of screen
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const isNearBottom = window.innerHeight - e.clientY < 100;
      setIsHoveringBottom(isNearBottom);
      
      if (isNearBottom && !isFooterVisible) {
        setIsFooterVisible(true);
        controls.start({ 
          y: 0, 
          opacity: 1,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        });
      } else if (!isNearBottom && isFooterVisible && !hideFooter) {
        // Auto-hide again after moving away from bottom
        setTimeout(() => {
          if (!isHoveringBottom) {
            setIsFooterVisible(false);
            controls.start({ 
              y: 80, 
              opacity: 0,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            });
          }
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFooterVisible, hideFooter, controls, isHoveringBottom]);

  return (
    <AppsDataProvider>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10001] 
                   focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg 
                   focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <SidebarProvider 
        defaultOpen={false}
        style={{
          "--sidebar-width": "320px",
          "--sidebar-width-mobile": "280px",
          "--sidebar-width-icon": "52px"
        } as React.CSSProperties}
      >
        <AppSidebar />
        <SidebarInset className={clsx("bg-bg-3 flex flex-col h-screen relative", pathname !== "/" && "overflow-hidden")}> 
          {/* Global decorative background overlays with footer text */}
          <div className="pointer-events-none absolute inset-0 bg-animated-mesh opacity-40" />
          <div className="pointer-events-none absolute inset-0 bg-radial-vignette opacity-60" />
          
          {/* Sticky Footer with Auto-hide & Hover Animation */}
          {!hideFooter && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={controls}
              className="fixed bottom-0 left-0 right-0 px-8 py-4 z-50 pointer-events-none"
            >
              <motion.div
                className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 
                           pointer-events-auto backdrop-blur-md bg-black/20 rounded-2xl px-6 py-3 
                           border border-white/5 shadow-2xl relative"
              >
                {/* Close button */}
                <motion.button
                  onClick={() => {
                    setIsDismissed(true);
                    sessionStorage.setItem('footer-dismissed', 'true');
                    controls.start({
                      y: 100,
                      opacity: 0,
                      transition: { duration: 0.3 }
                    });
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -top-2 -right-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 
                             border border-white/20 transition-colors"
                  aria-label="Dismiss footer"
                >
                  <X className="size-3 text-white/60" />
                </motion.button>

                <motion.div 
                  className="flex flex-col items-center sm:items-start"
                >
                  <span className="text-white/30 text-xs font-light">© 2025 Adriel AI</span>
                  <span className="text-[10px] text-white/20 font-light">The Intelligence Layer of the Internet</span>
                </motion.div>
                
                <motion.div 
                  className="flex gap-6 items-center"
                >
                  <motion.a 
                    href="/about"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/30 hover:text-cyan-400 transition-colors text-xs font-light relative group"
                  >
                    <span>About</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <motion.a 
                    href="/contact"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/30 hover:text-cyan-400 transition-colors text-xs font-light relative group"
                  >
                    <span>Contact</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <motion.a 
                    href="/pricing"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/30 hover:text-cyan-400 transition-colors text-xs font-light relative group"
                  >
                    <span>Pricing & FAQ</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <motion.a 
                    href="/guide"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/30 hover:text-cyan-400 transition-colors text-xs font-light relative group"
                  >
                    <span>Guide</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <motion.a 
                    href="/status"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/30 hover:text-cyan-400 transition-colors text-xs font-light relative group"
                  >
                    <span>Status</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <motion.a 
                    href="/terms"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/30 hover:text-cyan-400 transition-colors text-xs font-light relative group"
                  >
                    <span>Terms</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <motion.a 
                    href="/privacy"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/30 hover:text-cyan-400 transition-colors text-xs font-light relative group"
                  >
                    <span>Privacy</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <motion.a 
                    href="/cookies"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/30 hover:text-cyan-400 transition-colors text-xs font-light relative group"
                  >
                    <span>Cookies</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <motion.div 
                    className="flex items-center gap-2 text-xs text-white/30 font-light"
                  >
                    <span>Powered by</span>
                    <CloudflareLogo className="h-3" color1="#F6821F" color2="#FBAD41" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
          
          <GlobalHeader />
          <div id="main-content" className={clsx("flex-1 bg-bg-3/60", pathname !== "/" && "min-h-0 overflow-auto backdrop-blur-[1px]")}>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AppsDataProvider>
  );
}