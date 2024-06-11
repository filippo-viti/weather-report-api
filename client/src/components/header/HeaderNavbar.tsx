import {Button, Col, Container, Form, Navbar, Row, Stack} from "react-bootstrap";
import {ColorModeButton} from "./ColorModeButton.tsx";
import ProfileButton from "./ProfileButton.tsx";
import GitHubButton from "./GitHubButton.tsx";
import {useState} from "react";
import LoginModal from "../authentication/LoginModal.tsx";
import RegisterModal from "../authentication/RegisterModal.tsx";
import {useAuth} from "../authentication/AuthProvider.tsx";

export default function HeaderNavbar() {
  const {authToken} = useAuth();
  const [loginModalShow, setLoginModalShow] = useState<boolean>(false);
  const [registerModalShow, setRegisterModalShow] = useState<boolean>(false);
  // TODO: hide modal on successful login

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

          {!authToken &&
              <Button variant="primary" className="ms-2" onClick={() => setLoginModalShow(true)}>Login</Button>}
          <LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)}/>

          {!authToken &&
              <Button variant="primary" className="ms-2" onClick={() => setRegisterModalShow(true)}>Sign up</Button>}
          <RegisterModal show={registerModalShow} onHide={() => setRegisterModalShow(false)}/>

          <ColorModeButton/>
          <GitHubButton/>
        </Stack>
      </Container>
    </Navbar>
  );
}