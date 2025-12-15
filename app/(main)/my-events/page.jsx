'use client';

import { useRouter } from 'next/navigation';
import { Plus, Loader2, LoaderPinwheel } from 'lucide-react';
import Link from 'next/link';
import { useConvexQuery, useConvexMutation } from '@/hooks/use-convex-query';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import EventCard from '@/components/public/eventCard';

export default function MyEventsPage() {
  const router = useRouter();

  const { data: events, isLoading } = useConvexQuery(api.events.getMyEvents);
  const { mutate: deleteEvent } = useConvexMutation(api.events.deleteEvent);

  const handleDelete = async eventId => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this event? This action cannot be undone and will permanently delete the event and all associated registrations.'
    );

    if (!confirmed) return;

    try {
      await deleteEvent({ eventId });
      toast.success('Event deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to delete event');
    }
  };

  // Navigate to event dashboard instead of event detail
  const handleEventClick = eventId => {
    router.push(`/my-events/${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderPinwheel size={'40'} className="w-30 h-30 animate-spin text-[#696868]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Events</h1>
            <p className="text-muted-foreground">Manage your created events</p>
          </div>
        </div>

        {events?.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-2xl font-bold">No events yet</h2>
              <p className="text-muted-foreground">
                Create your first event and start managing attendees
              </p>
              <Button asChild className="gap-2">
                <Link href="/create-event">
                  <Plus className="w-4 h-4" />
                  Create Your First Event
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map(event => (
              <EventCard
                key={event._id}
                event={event}
                action="event"
                onClick={() => handleEventClick(event._id)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
