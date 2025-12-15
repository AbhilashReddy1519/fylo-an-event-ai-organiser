'use client';

import EventCard from '@/components/public/eventCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { CATEGORIES } from '@/lib/categories';
import { createLocationSlug } from '@/lib/location-utils';
import { format } from 'date-fns';
import Autoplay from 'embla-carousel-autoplay';
import {
  ArrowRight,
  Calendar,
  LoaderPinwheel,
  MapPin,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const ExplorePage = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const router = useRouter();

  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  const { data: featuredEvents, isLoading: loadingFeatured } = useConvexQuery(
    api.explore.getFeaturedEvents,
    { limit: 5 }
  );
  const { data: localEvents, isLoading: loadingLocal } = useConvexQuery(
    api.explore.getEventsByLocation,
    {
      city: currentUser?.location?.city || 'Gurgaon',
      state: currentUser?.location?.state || 'Haryana',
      limit: 4,
    }
  );
  // console.log(localEvents);

  const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(
    api.explore.getPopularEvents,
    {
      limit: 6,
    }
  );
  // console.log(popularEvents);

  const { data: categoryCounts } = useConvexQuery(
    api.explore.getCategoryCounts
  );

  const categoriesWithCounts = CATEGORIES.map(cat => ({
    ...cat,
    count: categoryCounts?.[cat.id] || 0,
  }));

  const handleEventClick = slug => {
    router.push(`/events/${slug}`);
  };

  const handleCategoryClick = categoryId => {
    router.push(`/explore/${categoryId}`);
  };

  const handleViewLocalEvents = () => {
    const city = currentUser?.location?.city || 'Gurugram';
    const state = currentUser?.location?.state || 'Haryana';

    const slug = createLocationSlug(city, state);
    router.push(`/explore/${slug}`);
  };

  const isLoading = loadingFeatured || loadingLocal || loadingPopular;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderPinwheel className="w-30 h-30 animate-spin text-[#999999]" />
      </div>
    );
  }
  // console.log(data);
  return (
    <>
      <div className="pb-12 text-center">
        <h1 className="text-5xl md:text-6xl text-[#b2b0b2] font-bold mb-4">
          Discover Events
        </h1>
        <p>
          Explore featured events, discover what&apos;s happening around you,
          and experience India&apos;s best gatherings.
        </p>
      </div>

      {/* feature events couresel */}
      {featuredEvents && featuredEvents.length > 0 && (
        <div className="mb-16">
          <Carousel
            className="w-full"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {featuredEvents.map(event => (
                <CarouselItem key={event._id}>
                  <div
                    onClick={() => handleEventClick(event.slug)}
                    className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer group bg-black"
                  >
                    {event.coverImage ? (
                      <Image
                        fill
                        className="object-cover"
                        priority
                        src={event.coverImage}
                        alt={event.title}
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: event.themeColor }}
                      />
                    )}
                    <div className="absolute backdrop-blur-[1px] inset-0 bg-linear-to-t from-black/60 to-transparent group-hover:from-black/80 transition-all" />
                    <div className="absolute bottom-0 left-0 p-8">
                      <Badge className="w-fit mb-4 text-white bg-black px-4 text-sm">
                        {event.city}, {event.state || event.country}
                      </Badge>
                      <h2 className="text-3xl font-bold md:text-5xl mb-3  text-white ">
                        {event.title}
                      </h2>
                      <p className="text-white/80 line-clamp-2 max-w-2xl text-lg mb-4 ">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-4 text-white/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {format(event.startDate, 'PPP')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{event.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">
                            {event.registrationCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={'cursor-pointer'} />
            <CarouselNext className={'cursor-pointer'} />
          </Carousel>
        </div>
      )}
      {/* local events */}
      {localEvents && localEvents.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl mb-1">Events Near you</h2>
              <p>Happening in {currentUser?.location?.city || 'your area'}</p>
            </div>

            <Button
              variant={'outline'}
              className={'gap-2 cursor-pointer'}
              onClick={handleViewLocalEvents}
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localEvents.map(event => (
              <EventCard
                key={event._id}
                event={event}
                variant={'grid'}
                onClick={() => {
                  handleEventClick(event.slug);
                }}
              />
            ))}
          </div>
        </div>
      )}
      {/* browse by categories  */}
      <div className="mb-16">
        <h2 className="text-3xl mb-6">
          Find{' '}
          <span className="text-transparent bg-linear-to-r from-[#22d3ee] via-[#8b5cf6] to-[#ec4899] bg-clip-text">
            Events
          </span>{' '}
          by Interest
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoriesWithCounts.map(category => {
            return (
              <Card
                key={category.id}
                className={
                  'py-2 group cursor-pointer hover:shadow-sm hover:shadow-white transition-all hover:border-white '
                }
                onClick={() => {
                  handleCategoryClick(category.id);
                }}
              >
                <CardContent className={'px-3 sm:px-6 flex items-center gap-3'}>
                  <div className="text-3xl sm:text-4xl text-[#dfd4d3]">
                    <CategoryIcon category={category.id} className='text-blue-500' size={'30'}/>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-sm group-hover:text-white text-[#b9b8b8] transition-colors">
                      {category.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} Event{category.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* popular events accross country */}
      {popularEvents && popularEvents.length > 0 && (
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="text-3xl mb-1">India&apos;s Trending Experiences</h2>
            <p className="text-muted-foreground">
              Uncover the events shaping India&apos;s rhythm right now
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 grid-cols-1">
            {popularEvents.map(event => (
              <EventCard
                event={event}
                key={event._id}
                variant="list"
                onClick={() => handleEventClick(event.slug)}
              />
            ))}
          </div>
        </div>
      )}

      {/* empty state */}

      {!loadingFeatured &&
        !loadingLocal &&
        !loadingPopular &&
        (!featuredEvents || featuredEvents.length === 0) &&
        (!localEvents || localEvents.length === 0) &&
        (!popularEvents || popularEvents.length === 0) && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold">No events yet</h2>
              <p className="text-muted-foreground">
                Be the first to create an event in your area!
              </p>
              <Button asChild className="gap-2">
                <Link href="/create-event">Create Event</Link>
              </Button>
            </div>
          </Card>
        )}
    </>
  );
};

export default ExplorePage;
