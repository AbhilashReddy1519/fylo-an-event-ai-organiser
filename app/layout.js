import './globals.css';
import SpotLightOverplay from './spotLightOverplay';

export const metadata = {
  title: 'Fylo',
  description: 'Plan. Sync. Celebrate. Events in Flow, Orchestrate Moments',
  author: 'Abhilash Reddy',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
        style={{
          backgroundColor: '#000',
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          minHeight: '1000vh',
        }}
      >
        {/* Header */}
        <SpotLightOverplay />
        <main className='relative'>
          {children}
          </main>
        {/* Footer */}
      </body>
    </html>
  );
}
