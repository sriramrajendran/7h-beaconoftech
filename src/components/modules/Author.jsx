import React from 'react';
import { useState } from 'react';
import Icon from '../ui/Icon'; // Assuming Icon component is in ui folder

const Author = () => {
  const [authorData, setAuthorData] = useState({
    name: "Sriram Rajendran",
    title: "Software Engineering Leader & Technology Innovator",
    experience: "2 decades",
    photo: "/assets/images/author-photo.jpg", // Use absolute path from public
    social: {
      linkedin: "https://www.linkedin.com/in/rsri",
      github: "https://github.com/sriramrajendran",
    },
  });

  const generateProfileSection = () => {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex-shrink-0">
          <img src={authorData.photo} alt={authorData.name} className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{authorData.name}</h3>
          <p className="text-md text-blue-600 dark:text-blue-400 mb-3">{authorData.title}</p>
          <div className="flex justify-center md:justify-start space-x-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              <span className="mr-2">🏛️</span> IEEE Senior Member
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              <span className="mr-2">👑</span> ioasd.org Royal Fellow
            </span>
          </div>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href={authorData.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
              <span className="mr-2">💼</span> LinkedIn
            </a>
            <a href={authorData.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200">
              <span className="mr-2">💻</span> GitHub
            </a>
          </div>
        </div>
      </div>
    );
  };

  const generateProfessionalBackground = () => {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">👨‍💻 Professional Background</h4>
        <p className="text-gray-700 dark:text-gray-300">Seasoned Software Engineering Leader with <strong className="font-semibold">{authorData.experience} of experience</strong> in financial services and technology innovation. Specializes in delivering transformative solutions that drive business growth and operational excellence through cutting-edge technologies and strategic leadership.</p>
      </div>
    );
  };

  const generateTechnologyExpertise = () => {
    const skills = [
      { category: "Gen AI & Cloud", items: ["Generative AI & Machine Learning", "AWS Cloud Services", "Event-Driven Architecture", "Microservices Design"] },
      { category: "Core Technologies", items: ["Java & Spring Framework", "Apache Kafka", "JavaScript (Node.js)", "APIs (REST/SOAP/gRPC)"] },
      { category: "Data & Databases", items: ["Data Modeling & Design", "NoSQL (DynamoDB/Cassandra/MongoDB)", "SQL (Oracle/PostgreSQL/MSSQL/DB2)", "Cache (Memcached/Redis)"] },
      { category: "DevOps & Infrastructure", items: ["Container Services (Docker/Kubernetes/ECS/Mesos)", "Automation & CI/CD", "DevOps & Agile (incl XP)", "Performance Tuning"] },
      { category: "Enterprise Systems", items: ["JavaEE & IBM SOA (Websphere/Process Server/BPEL)", "IBM MQ/WSRR/Datapower/WODM", "Redhat (JBPM/EAP/Drools)", "Design Patterns & Architecture"] },
      { category: "Leadership & Design", items: ["Strong Design Thinking", "Low Latency Systems", "High Availability & Resilience", "Systems at Scale"] },
    ];

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">🚀 Technology Expertise</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillCategory, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <h5 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{skillCategory.category}</h5>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {skillCategory.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const generateLeadershipSection = () => {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">🎯 Leadership & Innovation</h4>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong className="font-semibold">Cross-functional Team Leadership:</strong> Managing distributed teams and multi-million-dollar technology initiatives</li>
          <li><strong className="font-semibold">Digital Transformation:</strong> Leading enterprise-wide modernization efforts and cloud migration strategies</li>
          <li><strong className="font-semibold">Innovation Management:</strong> Establishing R&D practices and fostering culture of continuous improvement</li>
          <li><strong className="font-semibold">Technical Excellence:</strong> Implementing best practices in code quality, security, and performance optimization</li>
        </ul>
      </div>
    );
  };

  const generatePhilosophySection = () => {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">💡 Professional Philosophy</h4>
        <p className="text-gray-700 dark:text-gray-300">Committed to fostering diversity, inclusion, and continuous learning, resulting in impactful business outcomes and lasting value for customers. Passionate about technology advancement and engineering excellence, with a proven ability to design robust architectures and optimize performance in fast-paced environments.</p>
      </div>
    );
  };

  const generatePhotographySection = () => {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">📸 Photography & Creative Pursuits</h4>
        <p className="text-gray-700 dark:text-gray-300">Beyond the world of technology, I have a deep passion for photography - capturing moments, exploring perspectives, and finding beauty in the ordinary. Photography provides a creative balance to the logical precision of software engineering, allowing me to see the world through different lenses both literally and figuratively.</p>
        <div className="mt-4">
          <a href="https://www.instagram.com/rajen.sriram/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200">
            <span className="mr-2">📷</span> Check out my photography on Instagram
          </a>
        </div>
      </div>
    );
  };

  const generateContactSection = () => {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">📧 Get in Touch</h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Interested in collaboration, have questions about technology leadership, or want to discuss innovative projects? Feel free to reach out!</p>
        <div className="flex space-x-4">
          <a href={authorData.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
            <span className="mr-2">💼</span> Connect on LinkedIn
          </a>
          <a href={authorData.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-gray-700 text-white font-medium rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-200">
            <span className="mr-2">💻</span> View on GitHub
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">About the Author</h2>
      </div>
      <div className="space-y-8">
        {generateProfileSection()}
        <div className="space-y-6">
          {generateProfessionalBackground()}
          {generateTechnologyExpertise()}
          {generateLeadershipSection()}
          {generatePhilosophySection()}
          {generatePhotographySection()}
          {generateContactSection()}
        </div>
      </div>
    </div>
  );
};

export default Author;
