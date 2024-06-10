import './App.css'
import HeaderNavbar from "./components/header/HeaderNavbar.tsx";
import {useEffect, useState} from "react";
import {Container, Tab, Tabs} from "react-bootstrap";
import LocationCard from "./components/forecasts/LocationCard.tsx";
import {Location} from "./types";
import {fetchLocations} from "./api.ts";

function App() {
  const [locations, setLocations] = useState<Location[]>([])
  const [key, setKey] = useState<number>(0)
  useEffect(() => {
    fetchLocations()
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <>
      <HeaderNavbar/>
      <Container>
        <Tabs activeKey={key} onSelect={(k) => setKey(Number(k))} id="location-tabs" variant={"underline"} fill>
          {locations.map((location, index) => (
            <Tab eventKey={index} title={location.name} key={index}>
              <LocationCard location={location}/>
            </Tab>
          ))}
        </Tabs>
      </Container>
    </>
  )
}

export default App
