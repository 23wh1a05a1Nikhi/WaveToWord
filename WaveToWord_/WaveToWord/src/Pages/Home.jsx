import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [selectedFormat, setSelectedFormat] = useState("notes");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/about" className="nav-button">Home</Link>
          <Link to="/settings" className="nav-button">Settings</Link>
          <Link to="/qna" className="nav-button">Q&A</Link>
          
        </div>
      </nav>
      <br />
    </div>
  );
}

export default Home;
