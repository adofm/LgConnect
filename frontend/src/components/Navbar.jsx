import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaUser, FaCalendarAlt, FaSignOutAlt, FaHome } from 'react-icons/fa';
import main from "../components/lg.png";
import axios from "axios";
import { useState } from "react";
import CalendarModal from "./CalendarModal";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [translated, setTranslated] = useState({});
  const [language, setLanguage] = useState("ko");
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const texts = {
    welcome: "Welcome to LG Connect",
    profile: "Profile",
    logout: "Logout",
    translating: "Translating...",
    translate: "Translate",
    calendar: "Calendar",
    credits: "Credits"
  };

  const displayText = (key) => translated[key] || texts[key];

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const text = document.body.innerText;
      const res = await axios.post("http://localhost:5001/api/translate", {
        text,
        targetLang: language,
      });

      document.body.innerHTML = document.body.innerHTML.replace(
        text,
        res.data.translated
      );

      setLanguage(language === "ko" ? "en" : "ko");
    } catch (err) {
      console.error("Translation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isHomePage = location.pathname === '/home';
  const isWelcomePage = location.pathname === '/';

  return (
    <>
      <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <button
                onClick={handleLogoClick}
                className="flex items-center gap-0 hover:opacity-80 transition-all"
              >
                <img src={main} className="w-30 h-20" alt="LG logo" />
                <h1 className="text-lg font-bold text-gray-800">LG Connect</h1>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {authUser ? (
                <>
                  {(isHomePage || location.pathname === '/profile') && (
                    <button
                      onClick={() => navigate("/")}
                      className="btn btn-sm gap-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    >
                      <FaHome />
                      <span className="hidden sm:inline">Welcome Page</span>
                    </button>
                  )}
                  {isHomePage && (
                    <>
                      <button
                        className="btn btn-sm gap-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        onClick={() => setCalendarOpen(true)}
                      >
                        <FaCalendarAlt />
                        <span className="hidden sm:inline">
                          {displayText("calendar")}
                        </span>
                      </button>
                      <Link to={"/profile"} className="btn btn-sm gap-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200">
                        <FaUser />
                        <span className="hidden sm:inline">
                          {displayText("profile")}
                        </span>
                      </Link>
                    </>
                  )}
                  <button className="flex gap-2 items-center btn btn-sm bg-white text-gray-700 hover:bg-gray-50 border border-gray-200" onClick={handleLogout}>
                    <FaSignOutAlt />
                    <span className="hidden sm:inline">
                      {displayText("logout")}
                    </span>
                  </button>
                </>
              ) : (
                <>
                  {location.pathname === '/credits' && (
                    <button
                      onClick={() => navigate("/")}
                      className="btn btn-sm gap-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    >
                      <FaHome />
                      <span className="hidden sm:inline">Welcome Page</span>
                    </button>
                  )}
                  {isWelcomePage && (
                    <Link to="/credits" className="btn btn-sm gap-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200">
                      {displayText("credits")}
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <CalendarModal isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} />
    </>
  );
};

export default Navbar;
