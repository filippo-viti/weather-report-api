import HeaderNavbar from "./components/header/HeaderNavbar.tsx";
import {Container} from "react-bootstrap";
import {LocationTabs} from "./components/forecasts/LocationTabs.tsx";
import {useAuth} from "./components/authentication/AuthProvider.tsx";

function App() {
  const { accessToken } = useAuth();

  return (
    <>
      <HeaderNavbar/>
      <Container>
        {accessToken ? (<LocationTabs/>):(<h1>Please login or sign up to see the weather forecast</h1>)}
      </Container>
    </>
  )
}

export default App
