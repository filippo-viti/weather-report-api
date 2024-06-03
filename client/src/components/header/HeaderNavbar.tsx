import {Col, Container, Form, Navbar, Row} from "react-bootstrap";
import {ColorModeButton} from "./ColorModeButton.tsx";

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
        <ColorModeButton/>
      </Container>
    </Navbar>
  );
}