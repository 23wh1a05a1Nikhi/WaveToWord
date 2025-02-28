import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";
import "../App.css";

function TextGeneratorPage() {
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate text generation
    setTimeout(() => {
      setGeneratedText(
        "• Introduction to AI\n• Machine Learning Basics\n• Deep Learning Overview\n• Applications of AI in Real-World Scenarios"
      );
      setIsLoading(false); // Stop loading after text is generated
    }, 2000);
  }, []);

  // Function to download text as a .docx file
  const handleDownload = () => {
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph(generatedText)], // Convert text to a Word paragraph
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Generated_Notes.docx"); // Save the file
    });
  };

  return (
    <div className="bg">
      <h1 className="heading">Generated Content</h1>

      {isLoading ? (
        <p>Generating Content...</p>
      ) : (
        <>
          <textarea
            className="text-editor"
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)} // Allow editing
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
