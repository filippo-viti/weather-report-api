import {Col, Container, Row} from "react-bootstrap";
import {Location, WeatherDescription} from "../../types";
import WeekdayCard from "./WeekdayCard.tsx";

export default function LocationContainer({location}: { location: Location }) {
  const days = ['2024-6-3', '2024-6-4', '2024-6-5', '2024-6-6', '2024-6-7', '2024-6-8', '2024-6-9']

  return (
    <Container>
      <Row className={"text-center"}>
        <h1>{location.name}</h1>
        <h2 className={"text-muted"}>Latitude: {location.latitude} Longitude: {location.longitude}</h2>
      </Row>
      <Row className={"mt-2"}>
        {days.map((date, index) => (
          <Col key={index}>
            <WeekdayCard weather={
              {location, date, time: '12:00', temperature: 20, description: WeatherDescription.Sunny}
            }/>
          </Col>
        ))}
      </Row>
    </Container>
  )
}