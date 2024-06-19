import {useEffect, useState} from "react";
import {Location} from "../../types";
import {fetchLocations} from "../../api.ts";
import {Tab, Tabs} from "react-bootstrap";
import WeekdaysContainer from "./WeekdaysContainer.tsx";

export function LocationTabs() {
  const [locations, setLocations] = useState<Location[]>([])
  const [key, setKey] = useState<number>(0)
  useEffect(() => {
    fetchLocations()
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(Number(k))} id="location-tabs" variant={"underline"} fill>
      {locations.map((location, index) => (
        <Tab eventKey={index} title={location.name} key={index}>
          <WeekdaysContainer location={location}/>
        </Tab>
      ))}
    </Tabs>
  )
}