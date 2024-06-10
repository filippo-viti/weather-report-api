const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchLocations = async () => {
  const response = await fetch(`${BASE_API_URL}/locations`);
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  return response.json();
};

export const registerUser = async (email: string, password1: string, password2: string) => {
  const response = await fetch(`${BASE_API_URL}/auth/registration`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password1, password2})
  });
  if (!response.ok) {
    throw new Error('Failed to register user');
  }
  return response.json();
}

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_API_URL}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  });
  if (!response.ok) {
    throw new Error('Failed to login user');
  }
  return response.json();
}