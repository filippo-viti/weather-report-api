import {DetailedHTMLProps, HTMLAttributes, RefObject, ReactNode} from "react";
import {Button, Form, Modal, ModalBody, ModalHeader, ModalProps, ModalTitle} from "react-bootstrap";
import {Omit, BsPrefixProps} from "react-bootstrap/esm/helpers";
import {JSX} from "react/jsx-runtime";


export default function LoginModal(props: JSX.IntrinsicAttributes & Omit<Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
  ref?: RefObject<HTMLDivElement> | ((instance: HTMLDivElement | null) => void) | null | undefined;
}, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: ReactNode; }) {
  return (
    <Modal {...props} centered>
      <ModalHeader closeButton>
        <ModalTitle>Login</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}