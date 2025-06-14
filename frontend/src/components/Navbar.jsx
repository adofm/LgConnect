import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, User, CalendarDays } from "lucide-react"; // Calendar icon
import main from "../components/lg.png";
import axios from "axios";
import { useState } from "react";
import CalendarModal from "./CalendarModal"; // ✅ Import new component

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [translated, setTranslated] = useState({});
  const [language, setLanguage] = useState("ko");
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false); // ✅ modal state

  const texts = {
    welcome: "Welcome to LG Connect",
    profile: "Profile",
    logout: "Logout",
    translating: "Translating...",
    translate: "Translate",
    calendar: "Calendar",
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

  return (
    <>
      <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link
                to={authUser ? "/home" : "/"}
                className="flex items-center gap-0 hover:opacity-80 transition-all"
              >
                <img src={main} className="w-30 h-20" alt="LG logo" />
                <h1 className="text-lg font-bold">LG Connect</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {authUser && (
                <>
                  <button
                    className="btn btn-sm gap-2"
                    onClick={() => setCalendarOpen(true)}
                  >
                    <CalendarDays className="size-5" />
                    <span className="hidden sm:inline">
                      {displayText("calendar")}
                    </span>
                  </button>

                  <Link to={"/profile"} className="btn btn-sm gap-2">
                    <User className="size-5" />
                    <span className="hidden sm:inline">
                      {displayText("profile")}
                    </span>
                  </Link>

                  <button className="flex gap-2 items-center" onClick={logout}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">
                      {displayText("logout")}
                    </span>
                  </button>
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
