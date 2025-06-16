import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { 
  FaRobot, 
  FaComments, 
  FaShieldAlt, 
  FaMobileAlt, 
  FaSignInAlt, 
  FaUserPlus,
  FaCalendarAlt,
  FaTasks,
  FaBolt,
  FaHome
} from 'react-icons/fa';

const Welcome = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const features = [
    {
      icon: <FaRobot className="text-4xl text-white" />,
      title: "AI Assistant",
      description: "Smart AI agent to help with tasks, scheduling, and intelligent responses"
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-white" />,
      title: "Meeting Scheduler",
      description: "Easily schedule and manage meetings with smart time slot suggestions"
    },
    {
      icon: <FaTasks className="text-4xl text-white" />,
      title: "Task Management",
      description: "Create, track, and manage your tasks with real-time updates"
    },
    {
      icon: <FaShieldAlt className="text-4xl text-white" />,
      title: "End-to-End Encryption",
      description: "Your conversations and data are protected with military-grade encryption"
    },
    {
      icon: <FaMobileAlt className="text-4xl text-white" />,
      title: "Responsive Design",
      description: "Seamless experience across all your devices - desktop, tablet, and mobile"
    },
    {
      icon: <FaBolt className="text-4xl text-white" />,
      title: "Fast Messaging",
      description: "Lightning-fast message delivery with real-time notifications"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-white text-2xl font-bold">LG Connect</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/credits')}
                className="text-white hover:text-[#A50034] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Credits
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#A50034] mb-6">
            Welcome to LG Connect
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your all-in-one communication and productivity platform
          </p>
          
          {/* Action Buttons */}
          {!authUser ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 bg-[#A50034] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#720231] transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaSignInAlt />
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center justify-center gap-2 bg-[#A50034] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#720231]  transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaUserPlus />
                Register
              </button>
            </div>
          ) : (
            <div className="flex justify-center mb-16">
              <button
                onClick={() => navigate('/home')}
                className="flex items-center justify-center gap-2 bg-[#A50034] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#720231] transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaHome />
                Go to Home
              </button>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#A50034] rounded-xl p-6 text-white hover:bg-[#720231] transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
