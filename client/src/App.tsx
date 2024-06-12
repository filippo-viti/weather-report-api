import HeaderNavbar from "./components/header/HeaderNavbar.tsx";
import {Container} from "react-bootstrap";
import {LocationTabs} from "./components/forecasts/LocationTabs.tsx";
import {AuthProvider} from "./components/authentication/AuthProvider.tsx";

function App() {

  return (
    <AuthProvider>
      <HeaderNavbar/>
      <Container>
        <LocationTabs/>
      </Container>
    </AuthProvider>
  )
}

export default App
