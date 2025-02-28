import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function TextGeneratorPage() {
  const [transcribedText, setTranscribedText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const requestId = location.state?.request_id || null;

  console.log("🚀 Received requestId from navigation:", requestId);

  useEffect(() => {
    if (!requestId) {
      console.log("No request_id found, skipping transcription.");
      setIsLoading(false);
      return;
    }
    console.log("Fetching transcription for request ID:", requestId);
    axios
      .post(`http://localhost:8000/transcribe/${requestId}`)
      .then((response) => {
        console.log("Transcription API response: ", response.data);
        setTranscribedText(response.data.transcription_text);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transcription:", error);
        setIsLoading(false);
      });
  }, [requestId]);

  const saveTranscription = async (requestId, updatedText) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/update_transcription/${requestId}`,
        { transcription_text: updatedText }
      );
      console.log("Transcription updated:", response.data);
      alert("Transcription saved successfully!");
    } catch (error) {
      console.error("Error updating transcription:", error.response?.data || error.message);
      alert("Failed to save transcription.");
    }
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

      <h1 className="heading">Transcribed Content</h1>

      {isLoading ? (
        <p>Loading transcription...</p>
      ) : (
        <>
          <textarea
            className="text-editor"
            value={transcribedText} 
            onChange={(e) => setTranscribedText(e.target.value)} 
          />
          <div className="button-container">
            <button className="save-button" onClick={() => saveTranscription(requestId, transcribedText)}>
              Save Transcription
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TextGeneratorPage;
