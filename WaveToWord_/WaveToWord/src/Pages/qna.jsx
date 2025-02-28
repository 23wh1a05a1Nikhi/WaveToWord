import { Link } from "react-router-dom";

function Qna() {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/NotesPage" className="nav-button">Audio Transcript</Link>
          <Link to="/settings" className="nav-button">Settings</Link>
          <Link to="/About" className="nav-button">About</Link>
        </div>
      </nav>
      <br />
    </div>
  );
}

export default Qna;
