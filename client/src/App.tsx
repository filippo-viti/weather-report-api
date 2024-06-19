import HeaderNavbar from "./components/header/HeaderNavbar.tsx";
import {Container} from "react-bootstrap";
import {LocationTabs} from "./components/forecasts/LocationTabs.tsx";

function App() {

  return (
    <>
      <HeaderNavbar/>
      <Container>
        <LocationTabs/>
      </Container>
    </>
  )
}

export default App
