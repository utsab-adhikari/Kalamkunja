// src/app/about-us/page.jsx

import {
  FaRocket,
  FaUsers,
  FaGlobe,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";

export const metadata = {
  title: "About Us | Kalamkunja",
  description:
    "Learn about Kalamkunja, our mission to democratize knowledge sharing, and our passionate Nepali-led team.",
  keywords: [
    "Kalamkunja",
    "about us",
    "team",
    "mission",
    "vision",
    "Kalamkunja Nepal",
    "knowledge sharing",
  ],
  alternates: { canonical: "https://Kalamkunja.com/about-us" },
};

export default function AboutUs() {
  const stats = [
    {
      value: "10K+",
      label: "Active Users",
      icon: <FaUsers className="text-3xl text-blue-600" />,
    },
    {
      value: "50K+",
      label: "Articles Published",
      icon: <FaChartLine className="text-3xl text-green-600" />,
    },
    {
      value: "200+",
      label: "Countries Reached",
      icon: <FaGlobe className="text-3xl text-purple-600" />,
    },
    {
      value: "24/7",
      label: "Support Available",
      icon: <FaLightbulb className="text-3xl text-orange-600" />,
    },
  ];

  const team = [
    {
      name: "Utsab Adhikari",
      role: "CEO & Founder",
      bio: "Nepalese tech innovator passionate about democratizing knowledge for all.",
    },
    {
      name: "Samin Thapa",
      role: "CTO",
      bio: "Tech lead with experience in scalable systems and web platforms.",
    },
    {
      name: "Utsab Bhattarai",
      role: "Head of Content",
      bio: "Publishing expert curating quality content and empowering creators.",
    },
    {
      name: "Shiba Bhatta",
      role: "Community Lead",
      bio: "Focused on building an inclusive and engaged user community.",
    },
  ];

  return (
    <div className="">
      <div className="mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 p-3 mb-6">
            <FaRocket className="h-8 w-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Kalamkunja
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Building a globally accessible platform for Nepali and international
            creators to share knowledge and learn from each other.
          </p>
        </div>

        {/* Our Story */}
        <section className="bg-white shadow-md overflow-hidden mb-16">
          <div className="p-6 sm:p-8 md:flex md:items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png"
                alt="Kalamkunja - Logo"
                className="bg-gray-200 border-2 border-dashed w-full h-64 md:h-80"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded in 2025 in Nepal by Utsab Adhikari, Kalamkunja began
                with a simple goal: to level the playing field for knowledge
                sharing regardless of background or location.
              </p>
              <p className="text-gray-600">
                Today, our platform connects creators, experts, and learners
                across disciplines and geographies with a shared belief that
                knowledge empowers communities.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Mission & Values */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To democratize access to knowledge. We empower creators from Nepal
              and around the world to share expertise, build inclusive
              communities, and advance learning.
            </p>
          </div>
          <div className="bg-white shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li>
                <strong>Accessibility:</strong> Knowledge tools for everyone.
              </li>
              <li>
                <strong>Quality:</strong> Thoughtful writing and expert
                insights.
              </li>
              <li>
                <strong>Community:</strong> Building a supportive global
                network.
              </li>
              <li>
                <strong>Innovation:</strong> Continuously improving how we
                learn.
              </li>
            </ul>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white shadow-md overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png"
                 alt={`${member.name} - Kalamkunja`}
                  className="bg-gray-200 border-2 border-dashed w-full h-48"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="max-w-2xl mx-auto mb-6 text-blue-100">
            We’re always looking for passionate creators, leaders, and
            innovators who believe in open access to knowledge.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition">
              View Open Positions
            </button>
            <button className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-blue-700 transition">
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
