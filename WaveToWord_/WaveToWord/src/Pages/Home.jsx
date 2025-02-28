import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [selectedFormat, setSelectedFormat] = useState("notes");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/settings" className="nav-button">Settings</Link>
          <Link to="/qna" className="nav-button">Q&A</Link>
          <Link to="/about" className="nav-button">Home</Link>
        </div>
      </nav>

      <h1>Select a module</h1>

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

      <Link to="/notes" state={{ format: selectedFormat }}>
        <button className="generate-button">
          Generate {selectedFormat === "notes" ? "Notes" : "Text"} Format
        </button>
      </Link>
    </div>
  );
}

export default Home;
