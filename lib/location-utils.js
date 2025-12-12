import { State, City } from 'country-state-city';

export function createLocationSlug(city, state) {
  if (!city || !state) return '';

  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const stateSlug = state.toLowerCase().replace(/\s+/g, '-');

  return `${citySlug}-${stateSlug}`;
}

export function parseLocationSlug(slug) {
  if (!slug || typeof slug !== 'string') {
    return { city: null, state: null, isValid: false };
  }

  const parts = slug.split('-');

  // Must have at least 2 parts (city-state)
  if (parts.length < 2) {
    return { city: null, state: null, isValid: false };
  }

  // Get all Indian states
  const indianStates = State.getStatesOfCountry('IN');

  // Try to find the state by checking combinations from the end
  let stateObj = null;
  let statePartsCount = 1;
  while (statePartsCount < parts.length && !stateObj) {
    const stateParts = parts.slice(-statePartsCount);
    const stateName = stateParts
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');
    stateObj = indianStates.find(
      s => s.name.toLowerCase() === stateName.toLowerCase()
    );
    if (!stateObj) {
      statePartsCount++;
    }
  }

  if (!stateObj) {
    return { city: null, state: null, isValid: false };
  }

  // Parse city from remaining parts
  const cityParts = parts.slice(0, -statePartsCount);
  const cityName = cityParts
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');

  // Validate that the city exists within the state
  const citiesInState = City.getCitiesOfState('IN', stateObj.isoCode);
  const cityObj = citiesInState.find(
    c => c.name.toLowerCase() === cityName.toLowerCase()
  );

  if (!cityObj) {
    return { city: null, state: null, isValid: false };
  }

  return { city: cityName, state: stateObj.name, isValid: true };
}
