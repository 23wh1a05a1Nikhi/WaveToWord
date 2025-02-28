import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [selectedFormat, setSelectedFormat] = useState("notes"); // Default selection

  return (
    <div>
      <h1>Select a module</h1>

      {/* Radio Button Options */}
      <div>
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
        <label style={{ marginLeft: "20px" }}>
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
        <button>Generate {selectedFormat === "notes" ? "Notes" : "Text"} Format</button>
      </Link>
    </div>
  );
}

export default Home;
