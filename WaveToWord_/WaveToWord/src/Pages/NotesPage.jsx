import { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import Link
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
    navigate("/text-generator");
  };

  // Handle Resubmit File Button Click
  const handleResubmit = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the selected file
    }
  };

  return (
    <div className="bg">
      {/* Navbar with Home Button */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-button">Home</Link> {/* Home Icon */}
        </div>
      </nav>

      <h1>{selectedFormat === "notes" ? "Notes Format" : "Text Format"}</h1>
      <div className="bgclass">
        <input
          className="custom-file-label"
          type="file"
          id="Files"
          accept=".mp3, .wav"
          onChange={handleFileChange}
          ref={fileInputRef} // Attach the ref to input
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
