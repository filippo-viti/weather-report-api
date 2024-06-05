import './App.css'
import HeaderNavbar from "./components/header/HeaderNavbar.tsx";
import {useEffect, useState} from "react";
import {Container, Tab, Tabs} from "react-bootstrap";
import LocationCard from "./components/forecasts/LocationCard.tsx";
import {Location} from "./types";

function App() {
  const apiURL: string = "http://localhost:8000/api/"
  const [locations, setLocations] = useState<Location[]>([])
  const [key, setKey] = useState<number>(0)

  useEffect(() => {
    fetch(apiURL + "location")
      .then(response => response.json())
      .then(data => setLocations(data))
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
