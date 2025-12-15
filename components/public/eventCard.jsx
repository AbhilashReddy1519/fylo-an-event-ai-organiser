import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { getCategoryIcon, getCategoryLabel } from '@/lib/categories';
import { format } from 'date-fns';
import { Calendar, Eye, MapPin, QrCode, Trash2, Users, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CategoryIcon } from '../ui/CategoryIcon';

const EventCard = ({
  event,
  onClick,
  // showActions = false,
  action = null, // "event" | "ticket" | null
  onDelete,
  variant = 'grid',
  className = '',
}) => {
  if (variant === 'list') {
    return (
      <>
        <Card
          className={`py-0 group cursor-pointer hover:shadow-lg transition-all hover:border-[#999999] ${className}`}
          onClick={onClick}
        >
          <CardContent className={'p-3 flex gap-3'}>
            <div className="w-20 h-full rounded-lg overflow-hidden shrink-0 relative">
              {event.coverImage ? (
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes={`(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw`}
                  // width={''}
                  // height={100}
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center text-3xl"
                  style={{
                    backgroundColor: event.themeColor,
                  }}
                >
                  <CategoryIcon category={event.id} />
                  {console.log(event.category)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1 text-[#b9b8b8] group-hover:text-white transition-all line-clamp-2 ">
                {event.title}
              </h3>

              <p className="text-xs text-muted-foreground mb-1">
                {format(event.startDate, 'EEE, dd MMM, HH:MM')}
              </p>

              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <MapPin className="w-3 h-3" />
                <span className="line-clamp-1">
                  {event.locationType === 'online'
                    ? 'Online Event'
                    : event.city}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <Users className="w-3 h-3" />
                <span className="text-sm">
                  {event.registrationCount} attending
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
  return (
    <>
      <Card
        className={`overflow-hidden group pt-0 flex flex-col ${
          onClick
            ? 'cursor-pointer hover:shadow-lg transition-all hover:border-[#999999]'
            : ''
        } ${className}`}
        onClick={onClick}
      >
        <div className="h-40 overflow-hidden relative">
          {event.coverImage ? (
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              sizes={`(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw`}
              // width={''}
              // height={100}
            />
          ) : (
            <div
              className="w-full h-full  flex items-center justify-center text-4xl"
              style={{
                backgroundColor: event.themeColor,
              }}
            >
              <CategoryIcon category={event.id} />
              {console.log(event.category)}
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge variant={'secondary'} className={'bg-white text-black'}>
              {event.ticketType === 'free' ? 'Free' : 'Paid'}
            </Badge>
          </div>
        </div>
        <CardContent className={'p-3 flex-1 flex flex-col justify-between'}>
          <div>
            <div className="">
              <Badge
                variant={'outline'}
                className={'gap-2 mb-2 bg-white text-black'}
              >
                <CategoryIcon category={event.category} />{' '}
                {getCategoryLabel(event.category)}
              </Badge>
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-white transition-colors text-[#b9b8b8]">
                {event.title}
              </h3>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mt-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(event.startDate, 'PPP')}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <MapPin className="w-3 h-3" />
                <span className="line-clamp-1">
                  {event.locationType === 'online'
                    ? 'Online Event'
                    : event.city}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <Users className="w-3 h-3" />
                <span className="text-sm">
                  {event.registrationCount}/{event.capacity} registered
                </span>
              </div>
            </div>
          </div>

          {action && (
            <div className="flex gap-2 pt-2">
              {/* Primary button */}
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                onClick={e => {
                  e.stopPropagation();
                  onClick?.(e);
                }}
              >
                {action === 'event' ? (
                  <>
                    <Eye className="w-4 h-4" />
                    View
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4" />
                    Show Ticket
                  </>
                )}
              </Button>

              {/* Secondary button - delete / cancel */}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(event._id);
                  }}
                >
                  {action === 'event' ? (
                    <Trash2 className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default EventCard;
