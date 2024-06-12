import {useState} from "react";
import {Button, Form, Modal, ModalBody, ModalHeader, ModalTitle} from "react-bootstrap";
import {useAuth} from "./AuthProvider.tsx";
import {loginUser} from "../../api.ts";
import {JWTResponse} from "../../types";

export default function LoginButton() {
  const [loginModalShow, setLoginModalShow] = useState<boolean>(false);
  const {login} = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const token : JWTResponse = await loginUser(username, password);
    login(token);
  };
  return (
    <>
      <Button variant="primary" className="ms-2" onClick={() => setLoginModalShow(true)}>Login</Button>
      <Modal show={loginModalShow} onHide={() => setLoginModalShow(false)} centered>
        <ModalHeader closeButton>
          <ModalTitle>Login</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>
              Submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}