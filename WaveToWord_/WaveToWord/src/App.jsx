import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import NotesPage from "./Pages/NotesPage";
import TextGeneratorPage from "./Pages/TextGeneratorPage";
import About from "./Pages/About";
import Qna from "./Pages/qna";
import Settings from "./Pages/settings"; // Import the Settings component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/About" />} />
        <Route path="/About" element={<About />} />
        <Route path="/NotesPage" element={<NotesPage />} />
        <Route path="/TextGeneratorPage" element={<TextGeneratorPage />} />
        <Route path="/qna" element={<Qna />} />
        <Route path="/settings" element={<Settings />} /> {/* Add the Settings route */}
      </Routes>
    </Router>
  );
}

export default App;