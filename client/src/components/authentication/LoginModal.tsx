import {DetailedHTMLProps, HTMLAttributes, RefObject, ReactNode, useState} from "react";
import {Button, Form, Modal, ModalBody, ModalHeader, ModalProps, ModalTitle} from "react-bootstrap";
import {Omit, BsPrefixProps} from "react-bootstrap/esm/helpers";
import {JSX} from "react/jsx-runtime";
import {useAuth} from "./AuthProvider.tsx";
import {loginUser} from "../../api.ts";


export default function LoginModal(props: JSX.IntrinsicAttributes & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
  ref?: RefObject<HTMLDivElement> | ((instance: HTMLDivElement | null) => void) | null | undefined;
}, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: ReactNode; }) {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const token = await loginUser(username, password);
    login(token);
  };
  return (
    <Modal {...props} centered>
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
  )
}