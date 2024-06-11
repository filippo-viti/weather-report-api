import {Col, Container, Form, Navbar, Row, Stack} from "react-bootstrap";
import {ColorModeButton} from "./ColorModeButton.tsx";
import ProfileButton from "./ProfileButton.tsx";
import GitHubButton from "./GitHubButton.tsx";
import LoginButton from "../authentication/LoginButton.tsx";
import RegisterButton from "../authentication/RegisterButton.tsx";
import {useAuth} from "../authentication/AuthProvider.tsx";

export default function HeaderNavbar() {
  const {authToken} = useAuth();

  return (
    <Navbar expand="lg" bg={"primary"}>
      <Container>
        <Navbar.Brand href="#home">Weather Report</Navbar.Brand>
        <Form>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search location"
                className="mr-sm-2"
              />
            </Col>
            <Col xs="auto">
            </Col>
          </Row>
        </Form>
        <Stack className={"ms-auto"} direction={"horizontal"}>
          {authToken && <ProfileButton/>}
          {!authToken && <LoginButton/>}
          {!authToken && <RegisterButton/>}
          <ColorModeButton/>
          <GitHubButton/>
        </Stack>
      </Container>
    </Navbar>
  );
}