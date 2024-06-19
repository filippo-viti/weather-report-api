import { Card, CardBody, CardHeader, CardText, CardTitle, Row } from "react-bootstrap";
import { WeatherDescription, WeatherForecast } from "../../types";

export default function WeekdayCard({ weather }: { weather: WeatherForecast }) {
  const formattedTemperature = weather.temperature ? weather.temperature.toFixed(2) + "°C" : null;
  const weatherDescription = weather.description || "No forecasts available";
  const weatherIcon = getWeatherIcon(weather.description || "default");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{weather.date}</CardTitle>
      </CardHeader>
      <CardBody>
        <Row className={"text-center align-content-center fs-1"}>
          <i className={weatherIcon}></i>
        </Row>
        <Row className={"text-center"}>
          <CardText>{weatherDescription}</CardText>
          {formattedTemperature && <CardText>{formattedTemperature}</CardText>}
        </Row>
      </CardBody>
    </Card>
  );
}

function getWeatherIcon(description: WeatherDescription | "default") {
  switch (description) {
    case 'Sunny':
      return 'bi bi-sun';
    case 'Partly Cloudy':
      return 'bi bi-cloud-sun';
    case 'Cloudy':
      return 'bi bi-cloud';
    case 'Rainy':
      return 'bi bi-cloud-rain';
    case 'Snowy':
      return 'bi bi-snow';
    case 'Stormy':
      return 'bi bi-cloud-lightning-rain';
    case 'Foggy':
      return 'bi bi-cloud-fog';
    case 'Windy':
      return 'bi bi-wind';
    default:
      return 'bi bi-question-diamond';
  }
}
