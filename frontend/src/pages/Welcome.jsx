import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-r from-[#A50034] to-[#f6062e] text-white flex flex-col justify-center items-center text-center px-6 animate-fade-in">
      <span className="text-[8rem] font-bold">Welcome</span>

      <div className="flex text-[5rem] font-bold uppercase overflow-hidden mb-4">
        <span className="inline-block animate-slide-left">LG</span>
        <span className="inline-block animate-slide-right">Connect</span>
      </div>

      <p className="text-lg mb-8">Seamless Communication for Everyone</p>

      <div className="flex gap-6">
        <button
          onClick={() => navigate('/signup')}
          className="bg-white text-[#720231] px-6 py-3 text-base rounded-md font-medium transition-transform hover:scale-105"
        >
          Signup
        </button>
        <button
          onClick={() => navigate('/login')}
          className="bg-white text-[#720231] px-6 py-3 text-base rounded-md font-medium transition-transform hover:scale-105"
        >
          Login
        </button>
        <Link
          to="/credits"
          className="bg-white text-[#720231] px-6 py-3 text-base rounded-md font-medium transition-transform hover:scale-105"
        >
          Credits
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
