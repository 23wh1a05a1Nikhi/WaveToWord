import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/NotesPage" className="nav-button">Audio Transcript</Link> {/* Redirects to NotesPage */}
          <Link to="/settings" className="nav-button">Settings</Link>
          <Link to="/qna" className="nav-button">Q&A</Link>
        </div>
      </nav>

      {/* About Section */}
      <h1>About WaveToWord</h1>
      <p>This project converts speech/audio into structured text formats like notes and paragraphs.</p>
    </div>
  );
}

export default About;
