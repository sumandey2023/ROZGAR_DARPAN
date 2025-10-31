import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ChartDetails from "./pages/ChartDetails";
import LanguageDetail from "./pages/LanguageDetail";
import AIExplanation from "./pages/AIExplanation";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/charts" element={<ChartDetails />} />
          <Route path="/language-detail" element={<LanguageDetail />} />
          <Route path="/ai-explanation" element={<AIExplanation />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
