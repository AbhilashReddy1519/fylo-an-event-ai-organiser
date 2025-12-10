const { CATEGORY_ICONS } = require("@/lib/categories");

export function CategoryIcon({ category, size = 32, className= '' }) {
  const IconComponent = CATEGORY_ICONS[category];

  if (!IconComponent) return null; // fallback if category not found

  return <IconComponent size={size} className={`${className}`} />;
}

