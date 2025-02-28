import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [selectedFormat, setSelectedFormat] = useState("notes");

  return (
    <div>
      {/* Navbar (Included on all pages) */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-button">Home</Link> {/* Home Icon */}
          <Link to="/about" className="nav-button">About</Link> {/* About Icon */}
        </div>
      </nav>

      {/* Home Section */}
      <div id="home" className="content">
        <h1>Select a module</h1>

        {/* Radio Button Options */}
        <div className="options">
          <label>
            <input
              type="radio"
              name="format"
              value="notes"
              checked={selectedFormat === "notes"}
              onChange={() => setSelectedFormat("notes")}
            />
            Notes Format
          </label>
          <label>
            <input
              type="radio"
              name="format"
              value="text"
              checked={selectedFormat === "text"}
              onChange={() => setSelectedFormat("text")}
            />
            Text Format
          </label>
        </div>

        <br />

        {/* Navigate to NotesPage with selected format */}
        <Link to="/notes" state={{ format: selectedFormat }}>
          <button className="generate-button">
            Generate {selectedFormat === "notes" ? "Notes" : "Text"} Format
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
