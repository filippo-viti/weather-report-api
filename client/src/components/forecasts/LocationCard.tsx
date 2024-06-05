import {Card, CardBody, CardSubtitle, CardTitle} from "react-bootstrap";
import {Location} from "../../types";

export default function LocationCard({location}: {location: Location}) {
  return (
    <Card>
      <CardBody>
        <CardTitle>{location.name}</CardTitle>
        <CardSubtitle className={"text-muted"}>{location.latitude} {location.longitude}</CardSubtitle>
      </CardBody>
    </Card>
)
}