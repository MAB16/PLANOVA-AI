import { useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

function Navbar({ theme, language, toggleTheme, toggleLanguage }) {
  const isArabic = language === "ar";
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);

  const sideMenu = (
    <div className="side-menu-overlay" onClick={() => setMenuOpen(false)}>
      <aside className="side-menu" onClick={(e) => e.stopPropagation()}>
        <div className="side-menu-header">
          <div>
            <h2>Planova AI</h2>
            <p>{isArabic ? "القائمة الجانبية" : "Side Menu"}</p>
          </div>

          <button type="button" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>

        <div className="side-menu-links">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <span>🏠</span>
            {isArabic ? "الرئيسية" : "Dashboard"}
          </NavLink>

          <NavLink to="/ai-assistant" onClick={() => setMenuOpen(false)}>
            <span>🤖</span>
            {isArabic ? "المساعد الذكي" : "AI Assistant"}
          </NavLink>

          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            <span>ℹ️</span>
            {isArabic ? "عن المشروع" : "About"}
          </NavLink>
        </div>
      </aside>
    </div>
  );

  return (
    <>
      <header className={`navbar ${isDark ? "navbar-night" : "navbar-day"}`}>
        <div className="navbar-scene" aria-hidden="true">
          <span className="scene-sun">☀️</span>
          <span className="scene-moon">🌙</span>

          <span className="scene-cloud cloud-1" />
          <span className="scene-cloud cloud-2" />
          <span className="scene-cloud cloud-3" />
          <span className="scene-cloud cloud-4" />
          <span className="scene-cloud cloud-5" />
          <span className="scene-cloud cloud-6" />

          <span className="scene-star star-1" />
          <span className="scene-star star-2" />
          <span className="scene-star star-3" />
          <span className="scene-star star-4" />
          <span className="scene-star star-5" />
          <span className="scene-star star-6" />
          <span className="scene-star star-7" />
          <span className="scene-star star-8" />
          <span className="scene-star star-9" />
          <span className="scene-star star-10" />
        </div>

        <div className="nav-container">
          <NavLink to="/" className="brand">
            <span className="brand-mark">P</span>
            <span>Planova AI</span>
          </NavLink>

          <nav className="nav-links main-nav-links">
            <NavLink to="/study-planner">
              {isArabic ? "جدول الدراسة" : "Study Planner"}
            </NavLink>

            <NavLink to="/skill-planner">
              {isArabic ? "منظم المهارات" : "Skill Planner"}
            </NavLink>
          </nav>

          <div className="nav-actions">
            <button
              className={`theme-switch ${isDark ? "is-dark" : ""}`}
              onClick={toggleTheme}
              type="button"
            >
              <span className="switch-icon sun-switch">☀️</span>
              <span className="switch-thumb" />
              <span className="switch-icon moon-switch">🌙</span>
            </button>

            <button
              className="language-button"
              onClick={toggleLanguage}
              type="button"
            >
              <span>EN</span>
              <span>عربي</span>
            </button>

            <button
              className="menu-button"
              type="button"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {menuOpen && createPortal(sideMenu, document.body)}
    </>
  );
}

export default Navbar;