import {DropdownButton, DropdownItem} from "react-bootstrap";

export default function ProfileButton() {
  return (
    <DropdownButton title={<i className="bi bi-person-circle"></i>} align="end">
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Logout</DropdownItem>
    </DropdownButton>
  )
}