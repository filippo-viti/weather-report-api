const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchLocations = async () => {
  const response = await fetch(`${BASE_API_URL}/locations`);
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  return response.json();
};

export const registerUser = async (username: string, password: string, password2: string, email: string) => {
  const response = await fetch(`${BASE_API_URL}/auth/register/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password, password2, email})
  });
  if (!response.ok) {
    throw new Error('Failed to register user');
  }
  return response.json();
}

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Failed to login user:', errorDetails);
      throw new Error(`Failed to login user: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const refreshToken = async (refresh: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Failed to refresh token:', errorDetails);
      throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error during token refresh:', error);
    throw error;
  }
}