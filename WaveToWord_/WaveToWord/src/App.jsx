import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NotesPage from "./Pages/NotesPage";
import TextGeneratorPage from "./Pages/TextGeneratorPage"; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/text-generator" element={<TextGeneratorPage />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
