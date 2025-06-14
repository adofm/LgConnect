import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Todo from "../components/Todo";
import { ListTodo, X } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  return (
    <div className="h-screen bg-base-200 pt-20 px-4 py-6 flex">
      <div className="mr-4">
        <button
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
            ${showAnnouncements 
              ? 'bg-[#A50034] text-white hover:bg-[#720231]' 
              : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-[#A50034]'
            }
            shadow-sm hover:shadow-md
          `}
          onClick={() => setShowAnnouncements((prev) => !prev)}
        >
          {showAnnouncements ? (
            <>
              <X className="w-5 h-5" />
              <span>Hide Tasks</span>
            </>
          ) : (
            <>
              <ListTodo className="w-5 h-5" />
              <span>TO-DO List</span>
            </>
          )}
        </button>

        {showAnnouncements && (
          <div className="mt-4">
            <Todo />
          </div>
        )}
      </div>
      <div className="flex flex-1 bg-base-100 rounded-lg shadow-lg overflow-hidden">
        <Sidebar />
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  );
};

export default HomePage;
