const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('API error:', errorDetails);
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
  throw error;
};

export const fetchLocations = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/locations`);
    return await checkResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async (username: string, password: string, password2: string, email: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, password2, email })
    });
    return await checkResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return await checkResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getNewAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken })
    });
    return await checkResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const submitQuery = async (location: number, date: string, time: string | null, accessToken: string) => {
  try {
    const body = time ? { location, date, time } : { location, date };
    const response = await fetch(`${BASE_API_URL}/queries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    });
    return await checkResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const checkQueryStatus = async (queryId: number, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/queries/${queryId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return await checkResponse(response);
  } catch (error) {
    handleError(error);
  }
};
