'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

const ExploreLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isExplorePage = pathname === '/explore';

  return (
    <>
      <div className="pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {!isExplorePage && (
            <div className="mb-6">
              <Button
                variant={'default'}
                onClick={() => router.push('/explore')}
                className={'gap-2 -ml-2 cursor-pointer hover:bg-black hover:text-white transition-colors duration-500 ease-in-out'}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Explore
              </Button>
            </div>
          )}

          {children}
        </div>
      </div>
    </>
  );
};

export default ExploreLayout;
