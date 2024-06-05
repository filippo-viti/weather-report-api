import {Button, Col, Container, Form, Navbar, Row, Stack} from "react-bootstrap";
import {ColorModeButton} from "./ColorModeButton.tsx";
import ProfileButton from "./ProfileButton.tsx";
import GitHubButton from "./GitHubButton.tsx";

export default function HeaderNavbar() {
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
          <ProfileButton/>
          <Button variant="primary" className="ms-2">Login</Button>
          <Button variant="primary" className="ms-2">Sign up</Button>
          <ColorModeButton/>
          <GitHubButton/>
        </Stack>
      </Container>
    </Navbar>
  );
}