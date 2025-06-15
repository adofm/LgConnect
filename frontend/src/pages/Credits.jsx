import React from "react";
import { FaGithub, FaLinkedin, FaGraduationCap } from "react-icons/fa";

import karthik from "../components/karthik.jpg";
import tusharjoshi from "../components/tusharjoshi.jpg";

const Credits = () => {
  const developers = [
    {
      name: "Karthik Ganesan",
      image: karthik,
      role: "Full Stack Developer",
      education: "B.Tech in Computer Science",
      university: "Amrita Vishwa Vidyapeetham",
      github: "https://github.com/adofm",
      linkedin: "https://www.linkedin.com/in/adofm/",
      about:
        "Passionate full stack developer with experience in real-time applications and AI integration.",
      skills: [
        "React",
        "Node.js",
        "MongoDB",
        "Socket.IO",
        "AI Integration",
        "TypeScript",
        "Tailwind CSS",
      ],
    },
    {
      name: "Tushar Joshi",
      image: tusharjoshi,
      role: "Full Stack Developer",
      education: "B.Tech in Electronics and Communication",
      university: "Jaypee Institute of Information Technology",
      github: "https://github.com/Tushar05j",
      linkedin: "https://www.linkedin.com/in/tushar-joshi-8a3064242/",
      about:
        "Enthusiastic developer focused on building scalable web applications with modern tech.",
      skills: [
        "React",
        "Node.js",
        "MongoDB",
        "Socket.IO",
        "AI Integration",
        "Tailwind CSS",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Development Team</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-gray-800 rounded-xl shadow-md border border-gray-700 transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg p-8 flex flex-col items-center"
            >
              <img
                src={dev.image}
                alt={`${dev.name} Profile`}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-500 mb-4 group-hover:border-black transition-all duration-300"
              />
              <h2 className="text-2xl font-semibold text-white group-hover:text-black transition-colors">
                {dev.name}
              </h2>
              <p className="text-gray-400 group-hover:text-gray-700">{dev.role}</p>

              <div className="mt-4 text-center text-sm text-gray-300 group-hover:text-gray-800">
                <p className="font-semibold text-blue-400 group-hover:text-blue-600">About Me</p>
                <p className="mt-1">{dev.about}</p>
              </div>

              <div className="mt-4 text-sm text-center">
                <p className="text-blue-400 font-medium group-hover:text-blue-600">Education</p>
                <div className="flex items-center justify-center text-gray-400 mt-1 group-hover:text-gray-700">
                  <FaGraduationCap className="mr-2" />
                  {dev.education}
                </div>
                <p className="text-gray-500 group-hover:text-gray-600">{dev.university}</p>
              </div>

              <div className="mt-4 w-full">
                <p className="text-blue-400 font-medium text-sm mb-2 text-center group-hover:text-blue-600">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {dev.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-700 text-gray-100 group-hover:bg-gray-200 group-hover:text-gray-800 rounded-full text-xs font-medium transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <a
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 group-hover:text-black"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 group-hover:text-blue-600"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Credits;
