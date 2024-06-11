import {DetailedHTMLProps, HTMLAttributes, RefObject, ReactNode, useState} from "react";
import {Button, Form, Modal, ModalBody, ModalHeader, ModalProps, ModalTitle} from "react-bootstrap";
import {Omit, BsPrefixProps} from "react-bootstrap/esm/helpers";
import {JSX} from "react/jsx-runtime";
import {registerUser} from "../../api.ts";

export default function RegisterModal(props: JSX.IntrinsicAttributes & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
  ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined;
}, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: ReactNode; }) {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const handleRegister = async () => {
    const response = await registerUser(username, password, confirmPassword, email);

  };

  return (
    <Modal {...props} centered>
      <ModalHeader closeButton>
        <ModalTitle>Register</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" onClick={handleRegister}>
            Submit
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}