import {Dropdown, DropdownButton} from "react-bootstrap";
import {useAuth} from "../authentication/AuthProvider.tsx";

export default function ProfileButton() {
  const {logout: logout} = useAuth();
  return (
    <DropdownButton title={<i className="bi bi-person-circle"></i>} align="end">
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={logout} className={"text-danger"}>Logout</Dropdown.Item>
    </DropdownButton>
  )
}