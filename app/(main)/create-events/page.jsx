/* eslint-disable react-hooks/incompatible-library */
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { State, City } from 'country-state-city';
import { CalendarIcon, Loader2, Sparkles } from 'lucide-react';
import { useConvexMutation, useConvexQuery } from '@/hooks/use-convex-query';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import UnsplashImagePicker from '@/components/public/unsplashImagePicker';
import AIEventCreator from './_components/ai-event-creator';
import UpgradeModal from '@/components/layouts/upgradeModel';
import { CATEGORIES } from '@/lib/categories';
import Image from 'next/image';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

// HH:MM in 24h
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const eventSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Please select a category'),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date({ required_error: 'End date is required' }),
  startTime: z.string().regex(timeRegex, 'Start time must be HH:MM'),
  endTime: z.string().regex(timeRegex, 'End time must be HH:MM'),
  locationType: z.enum(['physical', 'online']).default('physical'),
  venue: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  ticketType: z.enum(['free', 'paid']).default('free'),
  ticketPrice: z.number().optional(),
  coverImage: z.string().optional(),
  themeColor: z.string().default('#1e3a8a'),
});

export default function CreateEventPage() {
  const router = useRouter();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState('limit'); // "limit" or "color"

  // Check if user has Pro plan
  const { has } = useAuth();
  const hasPro = has?.({ plan: 'pro' });

  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const { mutate: createEvent, isLoading } = useConvexMutation(
    api.events.createEvent
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      locationType: 'physical',
      ticketType: 'free',
      capacity: 50,
      themeColor: '#1e3a8a',
      category: '',
      state: '',
      city: '',
      startTime: '',
      endTime: '',
    },
  });

  const themeColor = watch('themeColor');
  const ticketType = watch('ticketType');
  const selectedState = watch('state');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const coverImage = watch('coverImage');

  const indianStates = useMemo(() => State.getStatesOfCountry('IN'), []);
  const cities = useMemo(() => {
    if (!selectedState) return [];
    const st = indianStates.find(s => s.name === selectedState);
    if (!st) return [];
    return City.getCitiesOfState('IN', st.isoCode);
  }, [selectedState, indianStates]);

  // Color presets - show all for Pro, only default for Free
  const colorPresets = [
    '#1e3a8a', // Default color (always available)
    ...(hasPro ? ['#4c1d95', '#065f46', '#92400e', '#7f1d1d', '#831843','#000'] : []),
  ];

  const handleColorClick = color => {
    // If not default color and user doesn't have Pro
    if (color !== '#1e3a8a' && !hasPro) {
      setUpgradeReason('color');
      setShowUpgradeModal(true);
      return;
    }
    setValue('themeColor', color);
  };

  const combineDateTime = (date, time) => {
    if (!date || !time) return null;
    const [hh, mm] = time.split(':').map(Number);
    const d = new Date(date);
    d.setHours(hh, mm, 0, 0);
    return d;
  };

  const onSubmit = async data => {
    try {
      const start = combineDateTime(data.startDate, data.startTime);
      const end = combineDateTime(data.endDate, data.endTime);

      if (!start || !end) {
        toast.error('Please select both date and time for start and end.');
        return;
      }
      if (end.getTime() <= start.getTime()) {
        toast.error('End date/time must be after start date/time.');
        return;
      }

      // Check event limit for Free users
      if (!hasPro && currentUser?.freeEventsCreated >= 1) {
        setUpgradeReason('limit');
        setShowUpgradeModal(true);
        return;
      }

      // Check if trying to use custom color without Pro
      if (data.themeColor !== '#1e3a8a' && !hasPro) {
        setUpgradeReason('color');
        setShowUpgradeModal(true);
        return;
      }

      await createEvent({
        title: data.title,
        description: data.description,
        category: data.category,
        tags: [data.category],
        startDate: start.getTime(),
        endDate: end.getTime(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        locationType: data.locationType,
        venue: data.venue || undefined,
        address: data.address || undefined,
        city: data.city,
        state: data.state || undefined,
        country: 'India',
        capacity: data.capacity,
        ticketType: data.ticketType,
        ticketPrice: data.ticketPrice || undefined,
        coverImage: data.coverImage || undefined,
        themeColor: data.themeColor,
        // hasPro,
      });

      toast.success('Event created successfully! 🎉');
      router.push('/my-events');
    } catch (error) {
      toast.error(error.message || 'Failed to create event');
    }
  };

  const handleAIGenerate = generatedData => {
    console.log(generatedData);

    setValue('title', generatedData.title);
    setValue('description', generatedData.description);
    setValue('category', generatedData.category);
    setValue('capacity', generatedData.suggestedCapacity);
    setValue('ticketType', generatedData.suggestedTicketType);
    toast.success('Event details filled! Customize as needed.');
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 px-6 py-8 -mt-6 md:-mt-16 lg:-mt-5 lg:rounded-md mb-10"
      style={{ backgroundColor: themeColor }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col gap-5 md:flex-row justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">Create Event</h1>
          {!hasPro && (
            <p className="text-sm text-muted-foreground mt-2">
              Free: {currentUser?.freeEventsCreated || 0}/1 events created
            </p>
          )}
        </div>
        <AIEventCreator onEventGenerated={handleAIGenerate} />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-[320px_1fr] gap-10">
        {/* LEFT: Image + Theme */}
        <div className="space-y-6">
          <div
            className="aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center cursor-pointer border"
            onClick={() => setShowImagePicker(true)}
          >
            {coverImage ? (
              <Image
                src={coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
                width={500} // Adjust width as needed
                height={500} // Adjust height as needed
                priority // Optional: prioritize loading this image
              />
            ) : (
              <span className="opacity-60 text-sm">
                Click to add cover image
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Theme Color</Label>
              {!hasPro && (
                <Badge variant="secondary" className="text-xs gap-1">
                  <Sparkles className="w-3 h-3" />
                  Pro
                </Badge>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {colorPresets.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    !hasPro && color !== '#1e3a8a'
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:scale-110'
                  }`}
                  style={{
                    backgroundColor: color,
                    borderColor: themeColor === color ? 'white' : 'transparent',
                  }}
                  onClick={() => handleColorClick(color)}
                  title={
                    !hasPro && color !== '#1e3a8a'
                      ? 'Upgrade to Pro for custom colors'
                      : ''
                  }
                />
              ))}
              {!hasPro && (
                <button
                  type="button"
                  onClick={() => {
                    setUpgradeReason('color');
                    setShowUpgradeModal(true);
                  }}
                  className="w-10 h-10 rounded-full border-2 border-dashed border-purple-300 flex items-center justify-center hover:border-purple-500 transition-colors"
                  title="Unlock more colors with Pro"
                >
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </button>
              )}
            </div>
            {!hasPro && (
              <p className="text-xs text-muted-foreground">
                Upgrade to Pro to unlock custom theme colors
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Title */}
          <div>
            <Input
              {...register('title')}
              placeholder="Event Name"
              className="text-3xl font-semibold bg-transparent border-none focus-visible:ring-0"
            />
            {errors.title && (
              <p className="text-sm text-red-400 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-6">
            {/* Start */}
            <div className="space-y-2">
              <Label className="text-sm">Start</Label>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {startDate ? format(startDate, 'PPP') : 'Pick date'}
                      <CalendarIcon className="w-4 h-4 opacity-60" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={date => setValue('startDate', date)}
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  {...register('startTime')}
                  placeholder="hh:mm"
                />
              </div>
              {(errors.startDate || errors.startTime) && (
                <p className="text-sm text-red-400">
                  {errors.startDate?.message || errors.startTime?.message}
                </p>
              )}
            </div>

            {/* End */}
            <div className="space-y-2">
              <Label className="text-sm">End</Label>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {endDate ? format(endDate, 'PPP') : 'Pick date'}
                      <CalendarIcon className="w-4 h-4 opacity-60" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={date => setValue('endDate', date)}
                      disabled={date => date < (startDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  {...register('endTime')}
                  placeholder="hh:mm"
                />
              </div>
              {(errors.endDate || errors.endTime) && (
                <p className="text-sm text-red-400">
                  {errors.endDate?.message || errors.endTime?.message}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm">Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <CategoryIcon category={cat.id} /> {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-sm text-red-400">{errors.category.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="text-sm">Location</Label>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={val => {
                      field.onChange(val);
                      setValue('city', '');
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map(s => (
                        <SelectItem key={s.isoCode} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!selectedState}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          selectedState ? 'Select city' : 'Select state first'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(c => (
                        <SelectItem key={c.name} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2 mt-6">
              <Label className="text-sm">Venue Details</Label>

              <Input
                {...register('venue')}
                placeholder="Venue link (Google Maps Link)"
                type="url"
              />
              {errors.venue && (
                <p className="text-sm text-red-400">{errors.venue.message}</p>
              )}

              <Input
                {...register('address')}
                placeholder="Full address / street / building (optional)"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              {...register('description')}
              placeholder="Tell people about your event..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Ticketing */}
          <div className="space-y-3">
            <Label className="text-sm">Tickets</Label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="free"
                  {...register('ticketType')}
                  defaultChecked
                />{' '}
                Free
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="paid" {...register('ticketType')} />{' '}
                Paid
              </label>
            </div>

            {ticketType === 'paid' && (
              <Input
                type="number"
                placeholder="Ticket price ₹"
                {...register('ticketPrice', { valueAsNumber: true })}
              />
            )}
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <Label className="text-sm">Capacity</Label>
            <Input
              type="number"
              {...register('capacity', { valueAsNumber: true })}
              placeholder="Ex: 100"
            />
            {errors.capacity && (
              <p className="text-sm text-red-400">{errors.capacity.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 text-lg rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...
              </>
            ) : (
              'Create Event'
            )}
          </Button>
        </form>
      </div>

      {/* Unsplash Picker */}
      {showImagePicker && (
        <UnsplashImagePicker
          isOpen={showImagePicker}
          onClose={() => setShowImagePicker(false)}
          onSelect={url => {
            setValue('coverImage', url);
            setShowImagePicker(false);
          }}
        />
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        trigger={upgradeReason}
      />
    </div>
  );
}
