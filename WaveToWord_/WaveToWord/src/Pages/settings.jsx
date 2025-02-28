import { Link } from "react-router-dom";
// Import the CSS file

function Settings() { // Renamed the component to Settings
  return (
    <div className="settings-container">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/NotesPage" className="nav-button">Audio Transcript</Link>
          <Link to="/About" className="nav-button">About</Link>
          <Link to="/qna" className="nav-button">Q&A</Link>
          <Link to="/About" className="nav-button">Home</Link>
        </div>
      </nav>
      <p className="settings-text">Settings Page</p>
    </div>
  );
}

export default Settings; // Export the Settings component