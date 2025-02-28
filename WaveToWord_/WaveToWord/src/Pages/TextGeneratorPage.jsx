import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";
import { useLocation, Link } from "react-router-dom";
import "../App.css";

function TextGeneratorPage() {
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const selectedFormat = location.state?.format || "notes"; // Get format from state

  // Simulate text generation delay
  useEffect(() => {
    setTimeout(() => {
      setGeneratedText(
        "• Introduction to AI\n• Machine Learning Basics\n• Deep Learning Overview\n• Applications of AI in Real-World Scenarios"
      );
      setIsLoading(false);
    }, 2000);
  }, []);

  // Function to download text as a .docx file
  const handleDownload = () => {
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph(generatedText)],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Generated_${selectedFormat === "notes" ? "Notes" : "Text"}.docx`);
    });
  };

  // Handle submit button click
  const handleSubmit = () => {
    alert("Text submitted successfully!");
  };

  return (
    <div className="bg">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-button">Audio Transcript</Link>
          <Link to="/settings" className="nav-button">Settings</Link>
          <Link to="/qna" className="nav-button">Q&A</Link>
          <Link to="/About" className="nav-button">Home</Link>
        </div>
      </nav>

      <h1 className="heading">Generated Content</h1>

      {isLoading ? (
        <p>Generating {selectedFormat === "notes" ? "Notes" : "Text"}...</p>
      ) : (
        <>
          <textarea
            className="text-editor"
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)}
          />
          <div className="button-container">
            <button className="download-button" onClick={handleDownload}>
              Download File
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TextGeneratorPage;
