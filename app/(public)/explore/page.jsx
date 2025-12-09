'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { format } from 'date-fns';
import Autoplay from 'embla-carousel-autoplay';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
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
      city: currentUser?.location?.city || 'Gurugram',
      state: currentUser?.location?.state || 'Haryana',
      limit: 4,
    }
  );

  const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(
    api.explore.getPopularEvents,
    {
      limit: 6,
    }
  );

  const { data: categoryCounts } = useConvexQuery(
    api.explore.getCategoryCounts
  );

  const handleEventClick = slug => {
    router.push(`/explore/${slug}`);
  };

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
                          <span className="text-sm">{event.registrationCount}</span>
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

      {/* browse by categories  */}

      {/* popular events accross country */}

      {/* empty state */}
    </>
  );
};

export default ExplorePage;
