import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Location, WeatherForecast, UserQuery } from '../../types';
import WeekdayCard from './WeekdayCard';
import { submitQuery, checkQueryStatus } from '../../api';
import { useAuth } from '../authentication/AuthProvider';

export default function LocationContainer({ location }: { location: Location }) {
  const { accessToken } = useAuth();
  const days = ['2024-6-3', '2024-6-4', '2024-6-5', '2024-6-6', '2024-6-7', '2024-6-8', '2024-6-9'];

  const [weatherData, setWeatherData] = useState<{ [key: string]: WeatherForecast | null }>({});

  useEffect(() => {
    if (!accessToken) return;

    async function fetchWeather() {
      const promises = days.map(async (date) => {
        try {
          const queryResponse: UserQuery = await submitQuery(location.id, date, null, accessToken!);

          if (queryResponse.status === 'Completed' && queryResponse.result) {
            return { date, weather: queryResponse.result };
          } else if (queryResponse.status === 'Failed') {
            return { date, weather: null }; // Handle the "Failed" status
          } else {
            const checkStatus = async (): Promise<WeatherForecast | null> => {
              const statusResponse: UserQuery = await checkQueryStatus(queryResponse.id, accessToken!);
              if (statusResponse.status === 'Completed' && statusResponse.result) {
                return statusResponse.result;
              } else if (statusResponse.status === 'Failed') {
                return null; // Handle the "Failed" status in recursive call
              } else {
                return new Promise((resolve) => {
                  setTimeout(async () => {
                    resolve(await checkStatus());
                  }, 1000);
                });
              }
            };
            const result = await checkStatus();
            return { date, weather: result };
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
          return { date, weather: null };
        }
      });

      const results = await Promise.all(promises);
      const newWeatherData: { [key: string]: WeatherForecast | null } = {};
      results.forEach(({ date, weather }) => {
        newWeatherData[date] = weather;
      });
      setWeatherData(newWeatherData);
    }

    fetchWeather();
  }, [location.id, accessToken]);

  return (
    <Container>
      <Row className="text-center">
        <h1>{location.name}</h1>
        <h2 className="text-muted">Latitude: {location.latitude} Longitude: {location.longitude}</h2>
      </Row>
      <Row className="mt-2">
        {days.map((date) => (
          <Col key={date}>
            {weatherData[date] !== undefined ? (
              weatherData[date] ? (
                <WeekdayCard weather={weatherData[date] as WeatherForecast} />
              ) : (
                <div>No forecasts available</div>
              )
            ) : (
              <div>Loading...</div>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
