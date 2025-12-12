'use client';

import { api } from '@/convex/_generated/api';
import { useConvexMutation, useConvexQuery } from '@/hooks/use-convex-query';
import { City, State } from 'country-state-city';
import { Calendar, LoaderPinwheel, MapPin, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { debounce } from 'lodash';
import { CategoryIcon } from '../ui/CategoryIcon';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { createLocationSlug } from '@/lib/location-utils';

function SearchLocationBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const searchRef = useRef(null);

  const { data: currentUser, isLoading } = useConvexQuery(
    api.users.getCurrentUser
  );

  const { mutate: updateLocation } = useConvexMutation(
    api.users.completeOnboarding
  );

  const { data: searchResult, isLoading: searchLoading } = useConvexQuery(
    api.search.searchEvents,
    searchQuery.trim().length >= 2 ? { query: searchQuery, limit: 5 } : 'skip'
  );

  const indianStates = State.getStatesOfCountry('IN');

  const cities = useMemo(() => {
    if (!selectedState) return [];
    const state = indianStates.find(s => s.name === selectedState);

    if (!state) return [];
    return City.getCitiesOfState('IN', state.isoCode);
  }, [selectedState, indianStates]);

  // console.log(cities);

  useEffect(() => {
    if (currentUser?.location) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCity(currentUser.location.city || '');
      setSelectedState(currentUser.location.state || '');
    }
  }, [currentUser, isLoading]);

  const debounceSetQuery = useRef(
    debounce(value => setSearchQuery(value), 300)
  ).current;

  const handleSearchInput = e => {
    const value = e.target.value;
    debounceSetQuery(value);
    setShowSearchResult(value.trim().length >= 2);
  };

  const handleEventClick = slug => {
    setShowSearchResult(false);
    setSearchQuery('');
    router.push(`/explore/${slug}`);
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResult(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchRef]);

  const handleLocationSelect = async (city, state) => {
    try {
      if (currentUser?.interests && currentUser?.location) {
        await updateLocation({
          location: { city, state, country: 'India' },
          interests: currentUser.interests,
        });
      }

      const slug = createLocationSlug(city, state);
      router.push(`/explore/${slug}`);
    } catch (error) {
      console.error('Failed to update location', error);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div className="relative flex w-full" ref={searchRef}>
          <div className="flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className={
                'pl-10 lg:w-50 md:w-full h-9 rounded-none rounded-l-md'
              }
              placeholder={'Search events...'}
              onFocus={() => {
                if (searchQuery.length >= 2) setShowSearchResult(true);
                // else setShowSearchResult(false);
              }}
              onChange={handleSearchInput}
            />
          </div>

          {showSearchResult && (
            <div className="absolute top-full mt-2 w-96 bg-background border rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto">
              {searchLoading ? (
                <div className="p-4 flex items-center justify-center">
                  <LoaderPinwheel className="w-5 h-5 animate-spin text-[#696868]" />
                </div>
              ) : searchResult && searchResult.length > 0 ? (
                <div className="py-2">
                  <p className="px-4 py-4 text-xs text-muted-foreground">
                    SEARCH RESULTS
                  </p>
                  {searchResult.map(event => {
                    return (
                      <button
                        key={event._id}
                        className="w-full px-4 py-3 group cursor-pointer hover:text-black hover:bg-white/70 text-left transition-colors border-t flex flex-col items-center"
                        onClick={() => handleEventClick(event.slug)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl mt-0.5">
                            <CategoryIcon
                              category={event.category}
                              className=""
                              size={'20'}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="mb-1 line-clamp-1">{event.title}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground group-hover:text-black ">
                              <span className="flex items-center gap-1 ">
                                <Calendar className="w-3 h-3" />
                                {format(event.startDate, 'MMM dd yyyy')}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.city}
                              </span>
                            </div>
                          </div>
                          {event.ticketType === 'free' && (
                            <Badge variant={'secondary'} className={'text-xs'}>
                              Free
                            </Badge>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-20 justify-center items-center w-full">
                  <p>No events found</p>
                </div>
              )}
            </div>
          )}
        </div>
        <Select
          value={selectedState}
          onValueChange={value => {
            setSelectedState(value);
            setSelectedCity('');
          }}
        >
          <SelectTrigger id="state" className="h-11 w-full rounded-none">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {indianStates.map(state => (
              <SelectItem key={state.isoCode} value={state.name}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedCity}
          onValueChange={value => {
            setSelectedCity(value);
            if (value && selectedState) {
              handleLocationSelect(value, selectedState);
            }
          }}
          disabled={!selectedState}
        >
          <SelectTrigger
            id="city"
            className="h-11 w-full rounded-none rounded-r-md"
          >
            <SelectValue
              placeholder={selectedState ? 'Select city' : 'State first'}
            />
          </SelectTrigger>
          <SelectContent>
            {cities.length > 0 ? (
              cities.map(city => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-cities" disabled>
                No cities available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default SearchLocationBar;
