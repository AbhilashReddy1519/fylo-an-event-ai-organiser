import {
  Cpu,
  Music4,
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
  BriefcaseBusiness,
  HeartPlus,
  LucideHandshake,
  LucideTentTree,
} from 'lucide-react';

// Event Categories (pure data, no icons here)
export const CATEGORIES = [
  {
    id: 'tech',
    label: 'Technology',
    description:
      'Where creators, builders, and innovators meet to shape the future.',
  },
  {
    id: 'music',
    label: 'Music',
    description:
      'Live sets, festivals, and performances that move people together.',
  },
  {
    id: 'sports',
    label: 'Sports',
    description:
      'High-energy games, tournaments, and fitness events for every athlete.',
  },
  {
    id: 'art',
    label: 'Art & Culture',
    description:
      'Creative showcases, cultural experiences, and stories that inspire.',
  },
  {
    id: 'food',
    label: 'Food & Drink',
    description: 'Tastings, workshops, and culinary journeys worth savoring.',
  },
  {
    id: 'business',
    label: 'Business',
    description:
      'Networking, conferences, and meetups that spark new opportunities.',
  },
  {
    id: 'health',
    label: 'Health & Wellness',
    description:
      'Refresh the mind and body with yoga, meditation, and wellness sessions.',
  },
  {
    id: 'education',
    label: 'Education',
    description:
      'Workshops and learning experiences that expand your skills and curiosity.',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    description:
      'Esports, tournaments, and gaming worlds buzzing with competition.',
  },
  {
    id: 'networking',
    label: 'Networking',
    description:
      'Connect with like-minded people and grow meaningful communities.',
  },
  {
    id: 'outdoor',
    label: 'Outdoor & Adventure',
    description: 'Hikes, camps, and outdoor escapes for your next great story.',
  },
  {
    id: 'community',
    label: 'Community',
    description:
      'Local gatherings and social events that bring people together.',
  },
];

// Map category id → icon component
export const CATEGORY_ICONS = {
  tech: Cpu,
  music: Music4,
  sports: Trophy,
  art: Palette,
  food: UtensilsCrossed,
  business: BriefcaseBusiness,
  health: HeartPlus,
  education: GraduationCap,
  gaming: Gamepad2,
  networking: LucideHandshake,
  outdoor: LucideTentTree,
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
