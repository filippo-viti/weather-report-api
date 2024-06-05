import {Button} from "react-bootstrap";

export default function GitHubButton() {
  // TODO: refactor this
  const buttonStyle = {
    height: "32px",
    border: "none",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
  return (
    <Button as={"a"} className="p-2" style={buttonStyle} href="https://github.com/filippo-viti/weather-report-api">
        <i className="bi bi-github"></i>
    </Button>
  )
}