const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchLocations = async () => {
  const response = await fetch(`${BASE_API_URL}/locations`);
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  return response.json();
};
