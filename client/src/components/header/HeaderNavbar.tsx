import {Alert, Container, Navbar, Stack} from "react-bootstrap";
import {ColorModeButton} from "./ColorModeButton.tsx";
import ProfileButton from "./ProfileButton.tsx";
import GitHubButton from "./GitHubButton.tsx";
import LoginButton from "../authentication/LoginButton.tsx";
import RegisterButton from "../authentication/RegisterButton.tsx";
import {useAuth} from "../authentication/AuthProvider.tsx";
import {useEffect, useState, useRef} from "react";
import {getNewAccessToken} from "../../api.ts";

export default function HeaderNavbar() {
  const {accessToken, login} = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const refreshTokenExecuted = useRef(false);

  useEffect(() => {
    if (!refreshTokenExecuted.current) {
      refreshTokenExecuted.current = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        getNewAccessToken(refreshToken)
          .then(jwtResponse => {
            login(jwtResponse);
          })
          .catch(error => {
            console.error('Failed to refresh token:', error);
          });
      }
    }
  }, [login]);

  useEffect(() => {
    if (accessToken) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [accessToken]);

  return (
    <>
      <Navbar expand="lg" bg={"primary"}>
        <Container>
          <Navbar.Brand href="#home">Weather Report</Navbar.Brand>
          <Stack className={"ms-auto"} direction={"horizontal"}>
            {accessToken && <ProfileButton/>}
            {!accessToken && <LoginButton/>}
            {!accessToken && <RegisterButton/>}
            <ColorModeButton/>
            <GitHubButton/>
          </Stack>
        </Container>
      </Navbar>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Welcome back!
        </Alert>
      )}
    </>
  );
}
