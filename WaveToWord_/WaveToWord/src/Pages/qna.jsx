import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../App.css"; // Ensure styling is applied

function Qna() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const newMessages = [...messages, { text: question, sender: "user" }];
    setMessages(newMessages);
    setQuestion("");

    try {
      const response = await axios.post("http://localhost:8000/qna", {
        question,
      });

      setMessages([
        ...newMessages,
        { text: response.data.answer, sender: "bot" },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { text: "Error fetching response.", sender: "bot" },
      ]);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/NotesPage" className="nav-button">Audio Transcript</Link>
          <Link to="/settings" className="nav-button">Settings</Link>
          <Link to="/About" className="nav-button">About</Link>
        </div>
      </nav>
      <br />
      <div className="chat-container">
        <h1>Q&A Chat</h1>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Qna;
