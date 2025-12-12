'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState, useEffect, useMemo } from 'react';
import { Progress } from '../ui/progress';
import { ArrowLeft, ArrowRight, Check, Heart, MapPin } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';
import { CategoryIcon } from '../ui/CategoryIcon';
import { Badge } from '../ui/badge';
import { useConvexMutation } from '@/hooks/use-convex-query';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { City, State } from 'country-state-city';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@radix-ui/react-label';

const SHADOW_COLORS = [
  '0 0 12px 0px rgba(34, 211, 238, 0.35)', // cyan glow
  '0 0 10px 2px rgba(139, 92, 246, 0.35)', // purple glow
  '0 0 12px 2px rgba(236, 72, 153, 0.35)', // pink glow
  '0 0 10px 2px rgba(251, 146, 60, 0.35)', // orange highlight
  '0 0 12px 2px rgba(255, 255, 255, 0.15)', // soft white metallic glow
];

export function OnBoardingModal({ isOpen, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [shadowColor, setShadowColor] = useState(SHADOW_COLORS[0]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [location, setLocation] = useState({
    state: '',
    city: '',
    country: 'India',
  });
  const progress = (step / 2) * 100;
  const indianStates = State.getStatesOfCountry('IN');

  const cities = useMemo(() => {
    if (!location.state) return [];
    const selectedState = indianStates.find(s => s.name === location.state);

    if (!selectedState) return [];
    return City.getCitiesOfState('IN', selectedState.isoCode);
  }, [location.state, indianStates]);

  const { mutate: completeOnboarding, isLoading } = useConvexMutation(
    api.users.completeOnboarding
  );

  useEffect(() => {
    if (isOpen) {
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % SHADOW_COLORS.length;
        setShadowColor(SHADOW_COLORS[index]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const toggleInterest = categoryId => {
    setSelectedInterests(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleComplete = async () => {
    try {
      await completeOnboarding({
        location: {
          city: location.city,
          state: location.state,
          country: location.country,
        },
        interests: selectedInterests,
      });

      toast.success('Welcome to Fylo');
      onComplete();
    } catch (err) {
      toast.error('Failed to complete onboarding');
      console.error(err);
    }
  };

  const handleNext = () => {
    if (step === 1 && selectedInterests.length < 3) {
      toast.error('Please select at least 3 interests');
      return;
    }

    if (step == 2 && (!location.city || !location.state)) {
      toast.error('Please select both state and city');
      return;
    }

    if (step < 2) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-2xl shadow transition-all duration-500"
        style={{
          boxShadow: `${shadowColor}`,
        }}
      >
        <DialogHeader>
          <div>
            <Progress value={progress} className={'mb-4 mt-4'} />
          </div>
          <DialogTitle className={'flex items-center gap-2 text-2xl'}>
            {step === 1 ? (
              <>
                <Heart className="w-6 h-6 text-red-500 mb-px" /> Choose what
                excites you.
              </>
            ) : (
              <>
                <MapPin className="w-6 h-6 text-blue-500" /> Your location helps
                us find events nearby.
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? 'Pick at least 3 interests so we can tailor events for you.'
              : 'We’ll recommend events happening around you.'}
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[280px] overflow-y-auto p-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    className={`border-2 p-4 cursor-pointer rounded-xl transition-all hover:scale-105 ${selectedInterests.includes(category.id) ? 'border-pink-500 bg-pink-900/20 shadow-md shadow-white' : 'hover:shadow hover:shadow-[#696868] border-border'}`}
                    onClick={() => toggleInterest(category.id)}
                  >
                    <div className="text-2xl mb-2 flex justify-center">
                      <CategoryIcon category={category.id} />
                    </div>
                    <div className="text-sm">{category.label}</div>
                  </button>
                ))}
              </div>

              <div className="flex items-center py-0 gap-3">
                <Badge
                  className={'px-3'}
                  variant={
                    selectedInterests.length >= 3 ? 'default' : 'secondary'
                  }
                >
                  {selectedInterests.length} selected
                </Badge>
                {selectedInterests.length >= 3 && (
                  <span className="text-sm flex text-green-500 gap-1">
                    <Check className="w-4 mt-0.5 h-4" /> Ready to continue
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={location.state}
                    onValueChange={value => {
                      setLocation({ ...location, state: value, city: '' });
                    }}
                  >
                    <SelectTrigger id="state" className="h-11 w-full">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select
                    value={location.city}
                    onValueChange={value =>
                      setLocation({ ...location, city: value })
                    }
                    disabled={!location.state}
                  >
                    <SelectTrigger id="city" className="h-11 w-full">
                      <SelectValue
                        placeholder={
                          location.state ? 'Select city' : 'State first'
                        }
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
              </div>

              {location.city && location.state && (
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Your location</p>
                      <p className="text-sm text-muted-foreground">
                        {location.city}, {location.state}, {location.country}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <DialogFooter className={'flex gap-2'}>
          {step > 1 && (
            <Button
              className={'cursor-pointer gap-1 flex'}
              onClick={() => setStep(prev => prev - 1)}
              variant={'outline'}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          )}

          <Button
            className={'cursor-pointer flex-1 gap-2'}
            disabled={isLoading}
            onClick={handleNext}
          >
            {isLoading
              ? 'Completing...'
              : step === 2
                ? 'Complete setup'
                : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
