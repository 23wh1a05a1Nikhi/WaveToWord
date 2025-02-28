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

  useEffect(() => {
    setTimeout(() => {
      setGeneratedText(
        "• Introduction to AI\n• Machine Learning Basics\n• Deep Learning Overview\n• Applications of AI in Real-World Scenarios"
      );
      setIsLoading(false);
    }, 2000);
  }, []);

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

  return (
    <div className="bg">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/about" className="nav-button">About</Link>
        </div>
      </nav>

      <h1 className="heading">{selectedFormat === "notes" ? "Generated Notes" : "Generated Text"}</h1>

      {isLoading ? (
        <p>Generating {selectedFormat === "notes" ? "Notes" : "Text"}...</p>
      ) : (
        <>
          <textarea
            className="text-editor"
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)}
          />
          <button className="download-button" onClick={handleDownload}>
            Download File
          </button>
        </>
      )}
    </div>
  );
}

export default TextGeneratorPage;
