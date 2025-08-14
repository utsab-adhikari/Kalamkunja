import { FaDiscord, FaGithub, FaTwitter, FaMeetup, FaUsers, FaMedal, FaHandsHelping } from 'react-icons/fa';
import Link from 'next/link';

export const metadata = {
  title: "Community | Kalamkunja ",
  description: "Join the Kalamkunja community to connect with creators, developers, and enthusiasts. Participate in events, mentorship programs, and contribute to open source projects.",
  keywords: "Kalamkunja, community, open source, events, mentorship, collaboration, developers",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
  alternates: {
    canonical: "https://Kalamkunja.com/community",
  },
};

export default function Community() {
  const events = [
    { id: 1, title: "Monthly Tech Talk", date: "August 20, 2025", time: "6:00 PM", location: "Virtual", description: "Join us for our monthly tech talk featuring industry experts discussing the latest trends in web development." },
    { id: 2, title: "Open Source Hackathon", date: "September 5-6, 2025", time: "10:00 AM", location: "Online", description: "Collaborate with developers worldwide to contribute to open source projects." },
    { id: 3, title: "Community Meetup", date: "September 25, 2025", time: "7:00 PM", location: "San Francisco", description: "Network with fellow community members and share your projects and ideas." }
  ];

  return (
    <>
      <div className="">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Kalamkunja Community
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of creators, developers, and enthusiasts who are building the future of knowledge sharing together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <FaUsers className="text-3xl mr-4" />
                <h2 className="text-lg sm:text-xl font-bold">Community Hub</h2>
              </div>
              <p className="mb-4 text-sm sm:text-base">
                Connect with like-minded individuals in our community forum where you can ask questions, share knowledge, and collaborate on projects.
              </p>
              <Link
                href="/community-forum"
                className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                Join Discussions
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 text-white transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <FaMedal className="text-3xl mr-4" />
                <h2 className="text-lg sm:text-xl font-bold">Contributor Program</h2>
              </div>
              <p className="mb-4 text-sm sm:text-base">
                Become a recognized contributor and get access to exclusive benefits, early features, and recognition for your contributions.
              </p>
              <Link
                href="/contributor-program"
                className="inline-block px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-teal-600 p-6 text-white transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <FaHandsHelping className="text-3xl mr-4" />
                <h2 className="text-lg sm:text-xl font-bold">Mentorship</h2>
              </div>
              <p className="mb-4 text-sm sm:text-base">
                Join our mentorship program to either mentor others or get guidance from experienced professionals in your field.
              </p>
              <Link
                href="/mentorship"
                className="inline-block px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200"
              >
                Explore Mentorship
              </Link>
            </div>
          </div>

          <div className="bg-white shadow-lg overflow-hidden mb-12">
            <div className="bg-gray-800 text-white px-4 sm:px-6 py-4">
              <h2 className="text-lg sm:text-xl font-semibold">Upcoming Events</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                {events.map(event => (
                  <div key={event.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="flex items-center mb-4 sm:mb-0 sm:w-1/4">
                        <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-4">
                          <div className="text-lg sm:text-xl font-bold">{new Date(event.date).getDate()}</div>
                          <div className="text-xs sm:text-sm">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                        </div>
                        <div>
                          <div className="font-medium text-sm sm:text-base">{event.time}</div>
                          <div className="text-xs sm:text-sm text-gray-600">{event.location}</div>
                        </div>
                      </div>
                      <div className="sm:w-1/2">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">{event.title}</h3>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">{event.description}</p>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:w-1/4 text-right">
                        <Link
                          href={`/events/${event.id}`}
                          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          RSVP
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/events"
                  className="inline-block px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  View All Events
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white px-4 sm:px-6 py-4">
              <h2 className="text-lg sm:text-xl font-semibold">Connect With Us</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link
                  href="https://discord.com/invite/Kalamkunja"
                  className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <FaDiscord className="text-indigo-600 text-4xl mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Discord</h3>
                  <p className="text-gray-600 text-center text-sm sm:text-base">Join our active community chat with 15k+ members</p>
                </Link>

                <Link
                  href="https://github.com/Kalamkunja"
                  className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <FaGithub className="text-gray-800 text-4xl mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">GitHub</h3>
                  <p className="text-gray-600 text-center text-sm sm:text-base">Contribute to our open source projects</p>
                </Link>

                <Link
                  href="https://twitter.com/Kalamkunja"
                  className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <FaTwitter className="text-blue-400 text-4xl mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Twitter</h3>
                  <p className="text-gray-600 text-center text-sm sm:text-base">Follow us for news and updates</p>
                </Link>

                <Link
                  href="https://meetup.com/Kalamkunja"
                  className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <FaMeetup className="text-red-500 text-4xl mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Meetups</h3>
                  <p className="text-gray-600 text-center text-sm sm:text-base">Join local community events worldwide</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}