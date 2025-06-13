import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Todo from "../components/Todo"; // <- changed

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  return (
    <div className="h-screen bg-base-200 pt-20 px-20 py-6 flex">
      <div className="mr-4">
        <button
          className="btn btn-ghost mb-4 -ml-4"
          onClick={() => setShowAnnouncements((prev) => !prev)}
        >
          {showAnnouncements ? "Hide Tasks" : "TO-DO List"}
        </button>

        {showAnnouncements && <Todo />}
      </div>
      <div className="flex flex-1 bg-base-100 rounded-lg shadow-lg overflow-hidden">
        <Sidebar />
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  );
};

export default HomePage;
