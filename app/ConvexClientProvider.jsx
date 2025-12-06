'use client';

import { useAuth } from '@clerk/nextjs';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error(
    'Missing NEXT_PUBLIC_CONVEX_URL environment variable. ' +
      'Please add it to your .env.local file.'
  );
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
export function ConvexClientProvider({ children }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
