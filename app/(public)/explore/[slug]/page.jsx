'use client';

import EventCard from '@/components/public/eventCard';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { CATEGORIES } from '@/lib/categories';
import { parseLocationSlug } from '@/lib/location-utils';
import { LoaderPinwheel } from 'lucide-react';
import { notFound, useParams, useRouter } from 'next/navigation';
import React from 'react';

const DynamicExporePage = () => {
  const params = useParams();
  const router = useRouter();

  const { slug } = params;
  console.log(slug);

  // Check if it's a valid category
  const categoryInfo = CATEGORIES.find(cat => cat.id === slug);
  const isCategory = !!categoryInfo;

  // If not a category, validate location
  const { city, state, isValid } = !isCategory
    ? parseLocationSlug(slug)
    : { city: null, state: null, isValid: false };

  // If it's not a valid category and not a valid location, show 404
  if (!categoryInfo && !isValid) {
    notFound();
  }

  const { data: events, isLoading } = useConvexQuery(
    isCategory
      ? api.explore.getEventsByCategory
      : api.explore.getEventsByLocation,
    isCategory
      ? { category: slug, limit: 50 }
      : city && state
        ? { city, state, limit: 50 }
        : 'skip'
  );

  const handleEventClick = eventSlug => {
    router.push(`events/${eventSlug}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderPinwheel className="w-30 h-30 animate-spin text-[#999999]" />
      </div>
    );
  }

  if (isCategory) {
    return (
      <>
        <div className="pb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="">
              <CategoryIcon
                category={categoryInfo.id}
                size={'75'}
                className="text-red-500"
              />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl">{categoryInfo.label}</h1>
              <p className="text-lg text-muted-foreground">
                {categoryInfo.description}
              </p>
            </div>
          </div>

          {events && events.length > 0 && (
            <p className="text-muted-foreground">
              {events.length} event{events.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
        {events && events.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard
                variant="grid"
                key={event._id}
                event={event}
                onClick={() => handleEventClick(event.slug)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No Events found in this category
          </p>
        )}
      </>
    );
  }

  return (
    <>
      <div className="pb-5">
        <h1 className="text-5xl md:text-6xl mb-1">
          Events in {city}, {state}
        </h1>
        <p className="text-lg text-muted-foreground mb-1 ml-px">
          Discover amazing events happening in your area.
        </p>
        {events && events.length > 0 && (
          <p className="text-muted-foreground mb-2">
            {events.length} event{events.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>
      {events && events.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard
              variant="grid"
              key={event._id}
              event={event}
              onClick={() => handleEventClick(event.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-50 transition-colors hover:border-pink-500 bg-black border border-white rounded-2xl">
          <p className="text-muted-foreground">
            No events here right now — try exploring nearby or pick another
            date
          </p>
        </div>
      )}
    </>
  );
};

export default DynamicExporePage;
