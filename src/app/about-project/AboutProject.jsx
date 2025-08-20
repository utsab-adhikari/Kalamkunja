"use client";
import React from "react"; // React is needed for JSX
import {
  FaGithub,
  FaServer,
  FaCloud,
  FaCode,
  FaCogs,
  FaDesktop,
  FaFileAlt,
  FaComments,
  FaShieldAlt,
  FaRobot,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiSocketdotio,
  SiGoogleanalytics,
} from "react-icons/si";

// NOTE: next/link is not available in this environment,
// so we will use a standard <a> tag for the links.

export default function ProjectOverview() {
  return (
    <div className="pt-10 pb-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Kalamkunja Project Overview
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A complete ecosystem for knowledge exploration, powered by modern
            web technologies, scalable architecture, and developer-first design.
          </p>
        </div>

        {/* Core Technologies */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FaCode className="text-blue-600" /> Core Technologies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <SiNextdotjs className="text-3xl text-gray-900 dark:text-gray-100" />
              <p className="mt-2 text-sm font-medium">Next.js</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <SiReact className="text-3xl text-blue-500" />
              <p className="mt-2 text-sm font-medium">React</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <SiTailwindcss className="text-3xl text-sky-500" />
              <p className="mt-2 text-sm font-medium">TailwindCSS</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <SiNodedotjs className="text-3xl text-green-600" />
              <p className="mt-2 text-sm font-medium">Node.js</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <SiExpress className="text-3xl text-gray-800 dark:text-gray-200" />
              <p className="mt-2 text-sm font-medium">Express</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <SiMongodb className="text-3xl text-green-700" />
              <p className="mt-2 text-sm font-medium">MongoDB</p>
            </div>
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <SiSocketdotio className="text-3xl text-green-700" />
              <p className="mt-2 text-sm font-medium">Socket IO</p>
            </div>
          </div>
        </section>

        {/* Dependencies */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FaCogs className="text-indigo-600" /> Dependencies & Tools
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 list-disc pl-6">
            <li>
              <strong>Auth.js + JWT</strong> – Secure authentication and session
              management.
            </li>
            <li>
              <strong>Axios</strong> – For efficient API communication.
            </li>
            <li>
              <strong>OpenRouter & OpenAI API</strong> – AI studio
            </li>
            <li>
              <strong>React Hot Toast</strong> – Instant user feedback &
              notifications.
            </li>
            <li>
              <strong>Framer Motion</strong> – Smooth animations and
              transitions.
            </li>
          </ul>
        </section>

        {/* Deployment & Architecture */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FaServer className="text-green-600" /> Deployment & Architecture
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Kalamkunja follows a <strong>MERN-based architecture</strong>,
            optimized for performance and scalability. The platform is deployed
            on <strong>Vercel (Frontend)</strong> and{" "}
            <strong>Render/Cloud (Backend)</strong>.
          </p>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">
              Load & Task Balancing
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              We maintain a <strong>separate Express server</strong> for
              handling load balancing and intensive AI tasks. This ensures a
              smoother user experience by separating article rendering from
              AI-related operations.
            </p>
          </div>
        </section>

        {/* GitHub Repositories */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FaGithub className="text-black dark:text-white" /> GitHub
            Repositories
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href="https://github.com/utsab-adhikari/Kalamkunja"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition-shadow duration-300 flex items-center gap-3"
            >
              <FaGithub className="text-2xl text-gray-800 dark:text-gray-200" />
              <div>
                <h3 className="font-semibold">Frontend (Next.js)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  UI, article editor, auth, and client-side features.
                </p>
              </div>
            </a>
            <a
              href="https://github.com/utsab-adhikari/express-ai-kalamkunja"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition-shadow duration-300 flex items-center gap-3"
            >
              <FaGithub className="text-2xl text-gray-800 dark:text-gray-200" />
              <div>
                <h3 className="font-semibold">Backend (Express)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  API, and AI task management.
                </p>
              </div>
            </a>
            <a
              href="https://github.com/utsab-adhikari/kalamkunja-socket"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition-shadow duration-300 flex items-center gap-3"
            >
              <FaGithub className="text-2xl text-gray-800 dark:text-gray-200" />
              <div>
                <h3 className="font-semibold">Socket IO (Express)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real time chat and Community
                </p>
              </div>
            </a>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <FaDesktop className="text-2xl text-blue-500 mb-3" />
              <h3 className="font-semibold text-lg">Admin Dashboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Centralized control for managing users, content, and community
                activities.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <SiGoogleanalytics className="text-2xl text-pink-500 mb-3" />
              <h3 className="font-semibold text-lg">Analytics (GA)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Google Analytics integration for traffic insights and
                performance tracking.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <FaUsers className="text-2xl text-green-600 mb-3" />
              <h3 className="font-semibold text-lg">Following System</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Build connections with personalized following and content
                recommendations.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <FaRobot className="text-2xl text-indigo-500 mb-3" />
              <h3 className="font-semibold text-lg">AI Article Studio</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered writing and editing tools for smarter content
                creation.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <FaShieldAlt className="text-2xl text-red-500 mb-3" />
              <h3 className="font-semibold text-lg">
                Role-Based Authorization
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fine-grained access control ensuring security and structured
                management.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <FaComments className="text-2xl text-teal-500 mb-3" />
              <h3 className="font-semibold text-lg">
                Real-Time Chat & Community
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interactive messaging system powered by Socket.IO for instant
                communication.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <FaFileAlt className="text-2xl text-yellow-500 mb-3" />
              <h3 className="font-semibold text-lg">Article Summarizer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-based summarization for quick and effective content
                understanding.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <FaDesktop className="text-2xl text-gray-500 mb-3" />
              <h3 className="font-semibold text-lg">Clean UI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Minimalist, fast, and accessible user interface with
                TailwindCSS.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <FaDesktop className="text-2xl text-blue-400 mb-3" />
              <h3 className="font-semibold text-lg">Personal Dashboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your articles, drafts, and personal settings efficiently.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <FaChartLine className="text-2xl text-green-400 mb-3" />
              <h3 className="font-semibold text-lg">Personal Analytics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track the performance of your content and engagement metrics.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition flex flex-col items-start">
              <FaUsers className="text-2xl text-indigo-400 mb-3" />
              <h3 className="font-semibold text-lg">User Profiles</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View profiles of every user, their posts, followers, and
                activity.
              </p>
            </div>
          </div>
        </section>

        {/* Developer Touch */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span role="img" aria-label="Developer">
              👨‍💻
            </span>{" "}
            Developer’s Touch
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Built with passion and precision by <strong>Utsab Adhikari</strong>,
            Kalamkunja is more than just a platform—it’s a vision to democratize
            knowledge and creativity. Every line of code is crafted to ensure
            accessibility, performance, and scalability.
          </p>
        </section>
      </div>
    </div>
  );
}
