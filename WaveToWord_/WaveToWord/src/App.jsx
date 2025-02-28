import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NotesPage from "./Pages/NotesPage";
import TextGeneratorPage from "./Pages/TextGeneratorPage";
import About from "./Pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/text-generator" element={<TextGeneratorPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
