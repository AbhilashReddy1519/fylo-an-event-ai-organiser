'use client';

import { SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Authenticated, Unauthenticated } from 'convex/react';
import { BarLoader } from 'react-spinners';
import { useStoreUser } from '@/hooks/use-store-user';
import { Building, Plus, Ticket } from 'lucide-react';
import { OnBoardingModal } from './OnBoardingModal';
import { useOnboarding } from '@/hooks/use-onboarding';
import SearchLocationBar from '../public/searchLocationBar';

function Header() {
  const { isLoading } = useStoreUser();
  const [showUpgradeModel, setShowUpgradeModel] = useState();
  const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
    useOnboarding();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-[6px] z-20  border-b">
        <nav className="max-w-6xl mx-auto flex py-6 px-6">
          <div className="flex items-center justify-between w-full">
            {/* logo */}
            <Link href={'/'} className="flex items-center">
              <Image
                src={'/logo.png'}
                alt="Flyo get in sync, plan and celebrate"
                width={500}
                height={500}
                className="w-full h-11"
                priority
              />
              {/* pro badge */}
            </Link>
            {/* search for desktop only */}
            <div className="hidden md:flex flex-1 justify-center">
              <SearchLocationBar />
            </div>

            {/* actions */}
            <div className="flex items-center">
              <Button
                variant={'ghost'}
                className={'cursor-pointer hover:underline'}
                size={'sm'}
                onClick={() => setShowUpgradeModel(true)}
              >
                Pricing
              </Button>
              <Button
                variant={'ghost'}
                size={'sm'}
                asChild
                className={'mr-2 hover:underline'}
              >
                <Link href={'/explore'}>Explore</Link>
              </Button>
              <Authenticated>
                {/* create event */}
                <Button size={'sm'} asChild className={'flex gap-2 mr-4'}>
                  <Link href={'/create-events'}>
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Create Event</span>
                  </Link>
                </Button>

                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Tickets"
                      labelIcon={<Ticket size={16} />}
                      href="/my-tickets"
                    />
                    <UserButton.Link
                      label="My Events"
                      labelIcon={<Building size={16} />}
                      href="/my-events"
                    />
                    <UserButton.Action label="manageAccount" />
                  </UserButton.MenuItems>
                </UserButton>
              </Authenticated>
              <Unauthenticated>
                <SignInButton mode="modal">
                  <Button
                    size="lg"
                    className={
                      'cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 '
                    }
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </Unauthenticated>
            </div>
          </div>
          {/* loader */}
          {isLoading && (
            <div className="absolute bottom-0 left-0 w-full">
              <BarLoader width={'100%'} height={'2px'} color="#7E7E7E" />
            </div>
          )}
        </nav>
        {/* search for mobile only */}
        <div className="md:hidden border-t px-3 py-3">
          <SearchLocationBar />
        </div>
        {/* modals */}
        <OnBoardingModal
          isOpen={showOnboarding}
          onClose={handleOnboardingSkip}
          onComplete={handleOnboardingComplete}
        />
      </header>
    </>
  );
}

export default Header;
