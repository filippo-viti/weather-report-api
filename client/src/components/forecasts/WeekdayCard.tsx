import { Card, CardBody, CardHeader, CardText, CardTitle, Row } from "react-bootstrap";
import { WeatherDescription, WeatherForecast } from "../../types";

export default function WeekdayCard({ weather }: { weather: WeatherForecast }) {
  const formattedTemperature = weather.temperature.toFixed(2); // Limit to two decimal places

  return (
    <Card>
      <CardHeader>
        <CardTitle>{weather.date}</CardTitle>
      </CardHeader>
      <CardBody>
        <Row className={"text-center align-content-center fs-1"}>
          <i className={getWeatherIcon(weather.description)}></i>
        </Row>
        <Row className={"text-center"}>
          <CardText className={"m-0"}>{weather.description}</CardText>
          <CardText>{formattedTemperature}°C</CardText>
        </Row>
      </CardBody>
    </Card>
  );
}

function getWeatherIcon(description: WeatherDescription) {
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
