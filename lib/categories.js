import {
  Cpu,
  Music,
  Trophy,
  Palette,
  UtensilsCrossed,
  Briefcase,
  HeartPulse,
  GraduationCap,
  Gamepad2,
  Handshake,
  Tent,
  Users,
  CalendarDays,
} from 'lucide-react';

// Event Categories (pure data, no icons here)
export const CATEGORIES = [
  {
    id: 'tech',
    label: 'Technology',
    description: 'Tech meetups, hackathons, and developer conferences',
  },
  {
    id: 'music',
    label: 'Music',
    description: 'Concerts, festivals, and live performances',
  },
  {
    id: 'sports',
    label: 'Sports',
    description: 'Sports events, tournaments, and fitness activities',
  },
  {
    id: 'art',
    label: 'Art & Culture',
    description: 'Art exhibitions, cultural events, and creative workshops',
  },
  {
    id: 'food',
    label: 'Food & Drink',
    description: 'Food festivals, cooking classes, and culinary experiences',
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Networking events, conferences, and startup meetups',
  },
  {
    id: 'health',
    label: 'Health & Wellness',
    description: 'Yoga, meditation, wellness workshops, and health seminars',
  },
  {
    id: 'education',
    label: 'Education',
    description: 'Workshops, seminars, and learning experiences',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    description: 'Gaming tournaments, esports, and gaming conventions',
  },
  {
    id: 'networking',
    label: 'Networking',
    description: 'Professional networking and community building events',
  },
  {
    id: 'outdoor',
    label: 'Outdoor & Adventure',
    description: 'Hiking, camping, and outdoor activities',
  },
  {
    id: 'community',
    label: 'Community',
    description: 'Local community gatherings and social events',
  },
];

// Map category id → icon component
export const CATEGORY_ICONS = {
  tech: Cpu,
  music: Music,
  sports: Trophy,
  art: Palette,
  food: UtensilsCrossed,
  business: Briefcase,
  health: HeartPulse,
  education: GraduationCap,
  gaming: Gamepad2,
  networking: Handshake,
  outdoor: Tent,
  community: Users,
};

// Get category by ID
export const getCategoryById = id => {
  return CATEGORIES.find(cat => cat.id === id);
};

// Get category label by ID
export const getCategoryLabel = id => {
  const category = getCategoryById(id);
  return category ? category.label : id;
};

// Get icon component by ID
export const getCategoryIcon = id => {
  return CATEGORY_ICONS[id] || CalendarDays; // fallback icon
};
