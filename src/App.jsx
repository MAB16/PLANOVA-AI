import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import StudyPlanner from "./pages/StudyPlanner";
import SkillPlanner from "./pages/SkillPlanner";
import About from "./pages/About";
import AIAssistant from "./pages/AIAssistant";
function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  const isArabic = language === "ar";

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  function toggleLanguage() {
    setLanguage((current) => (current === "en" ? "ar" : "en"));
  }

  return (
    <BrowserRouter>
      <div
        className={`app-shell theme-${theme} lang-${language}`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <Navbar
          theme={theme}
          language={language}
          toggleTheme={toggleTheme}
          toggleLanguage={toggleLanguage}
        />

        <Routes>
          <Route path="/" element={<Dashboard language={language} />} />
          <Route path="/study-planner" element={<StudyPlanner language={language} />} />
          <Route path="/skill-planner" element={<SkillPlanner language={language} />} />
        <Route path="/about" element={<About language={language} />} />
        <Route path="/ai-assistant" element={<AIAssistant language={language} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
