import { useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../App.css";

function NotesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  // Read format from Home page, default to "notes" if not provided
  const selectedFormat = location.state?.format || "notes";

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 5) {
        alert("File size exceeds 5MB. Please choose a smaller file.");
        event.target.value = "";
      }
    } else {
      alert("No file selected.");
    }
  };

  // Handle Generate Button Click
  const handleGenerateClick = () => {
    if (fileInputRef.current && fileInputRef.current.files.length > 0) {
      navigate("/TextGeneratorPage");
    } else {
      alert("Please upload a file.");
    }
  };

  // Handle Resubmit File Button Click
  const handleResubmit = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.type = "";
      fileInputRef.current.type = "file";
    }
  };

  return (
    <div className="bg">
      {/* Navbar with Home and About Buttons */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/About" className="nav-button">About</Link>
          <Link to="/settings" className="nav-button">Settings</Link>
          <Link to="/qna" className="nav-button">Q&A</Link>
        </div>
      </nav>

      {/* Default Heading */}
      <h1>Choose an .mp3 or .wav file</h1>

      <div className="bgclass">
        <input
          className="custom-file-label"
          type="file"
          id="Files"
          accept=".mp3, .wav"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
      <br />
      <button type="button" id="gentext" onClick={handleGenerateClick}>
        Generate Text
      </button>
      <button type="button" id="change" onClick={handleResubmit}>
        Resubmit File
      </button>
    </div>
  );
}

export default NotesPage;