import { ThemeProvider } from '@/components/public/theme-provider';
import './globals.css';
import SpotLightOverplay from '../components/public/spotLightOverplay';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { ConvexClientProvider } from './ConvexClientProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Fylo',
  description: 'Plan. Sync. Celebrate. Events in Flow, Orchestrate Moments',
  authors: [{ name: 'Abhilash Reddy' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-serif`}
        style={{
          backgroundColor: '#000',
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          minHeight: '100vh',
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              theme: dark,
            }}
          >
            <ConvexClientProvider>
              {/* Header */}
              <Header />
              <SpotLightOverplay />
              <main className="relative min-h-screen container mx-auto pt-40 md:pt-32">
                <div className="relative z-15">{children}</div>
                <Toaster richColors position='top-right'/>
              </main>
              {/* Footer */}
              <Footer />

            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
