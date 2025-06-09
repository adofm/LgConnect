import React from 'react';
import { FaGithub, FaLinkedin, FaGraduationCap } from 'react-icons/fa';

const Credits = () => {
  const developers = [
    {
      role: "Full Stack Developer",
      education: "B.Tech in Computer Science",
      university: "Placeholder College Name",
      github: "https://github.com/karthikganesan",
      linkedin: "https://linkedin.com/in/karthikganesan",
      skills: ["React", "Node.js", "MongoDB", "Socket.IO", "AI Integration", "TypeScript", "Tailwind CSS"]
    },
    {
      role: "Full Stack Developer",
      education: "B.Tech in Computer Science",
      university: "Placeholder College Name",
      github: "https://github.com/meenakshiganesan",
      linkedin: "https://linkedin.com/in/meenakshiganesan",
      skills: ["React", "Node.js", "MongoDB", "Socket.IO", "AI Integration", "TypeScript", "Tailwind CSS"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Development Team</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {developers.map((dev, index) => (
            <div 
              key={index}
              className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{dev.role}</h2>
                  <div className="flex items-center text-gray-400">
                    <FaGraduationCap className="mr-2" />
                    <span>{dev.education}</span>
                  </div>
                  <p className="text-gray-500 mt-1">{dev.university}</p>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {dev.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Credits; 