import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

export function ColorModeButton() {
  const preferredMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [isDarkMode, setIsDarkMode] = useState(preferredMode === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }, [isDarkMode]);

  const lightModeIcon = <i className="bi bi-sun"></i>
  const darkModeIcon = <i className="bi bi-moon-stars"></i>

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
    <Button className="p-2 m-2" style={buttonStyle} onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Dark mode toggle">{isDarkMode ? darkModeIcon : lightModeIcon}</Button>
  )
}