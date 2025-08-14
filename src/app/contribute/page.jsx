import { FaCode, FaPen, FaBug, FaLightbulb, FaHandshake } from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: "Contribute | Kalamkunja",
  description:
    "Join the Kalamkunja community to contribute content, develop features, report issues, or share ideas. Help shape the future of knowledge sharing.",
  keywords: [
    "Kalamkunja",
    "contribute",
    "open source",
    "content creation",
    "community",
    "developers",
  ],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  alternates: {
    canonical: "https://Kalamkunja.com/contribute",
  },
  charset: "utf-8",
};

export default function Contribute() {
  return (
    <>
      <div className="">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Contribute to Kalamkunja
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Join our community of creators, developers, and enthusiasts to
              help build the future of knowledge sharing.
            </p>
          </div>

          <div className="bg-white shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
                <div className="bg-blue-50 p-6 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FaPen className="text-blue-600 text-xl" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      Write Content
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Share your knowledge with the world by writing articles,
                    tutorials, or guides on topics you're passionate about.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>Technical tutorials and how-to guides</li>
                    <li>Industry insights and analysis</li>
                    <li>Thought leadership pieces</li>
                    <li>Case studies and project showcases</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaCode className="text-green-600 text-xl" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      Develop with Us
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Help us build and improve the Kalamkunja platform. Our codebase
                    is open source and we welcome contributions from developers.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>Fix bugs and implement features</li>
                    <li>Improve performance and scalability</li>
                    <li>Enhance user experience</li>
                    <li>Create integrations and plugins</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-6 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                      <FaBug className="text-yellow-600 text-xl" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      Report Issues
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Help us improve by reporting bugs, suggesting enhancements,
                    or identifying security vulnerabilities.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>Submit detailed bug reports</li>
                    <li>Suggest new features and improvements</li>
                    <li>Report security concerns responsibly</li>
                    <li>Help prioritize issues</li>
                  </ul>
                </div>

                <div className="bg-purple-50  p-6 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <FaLightbulb className="text-purple-600 text-xl" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      Share Ideas
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Contribute to our roadmap by sharing your ideas for how
                    Kalamkunja can better serve our community.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>Suggest new content categories</li>
                    <li>Propose community initiatives</li>
                    <li>Recommend platform improvements</li>
                    <li>Share feedback on existing features</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 mb-8">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <FaHandshake className="text-indigo-600 text-xl" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Get Started
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                      For Content Contributors
                    </h4>
                    <ol className="list-decimal pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                      <li>Create an account or log in</li>
                      <li>Read our content guidelines</li>
                      <li>Submit your first article draft</li>
                      <li>Work with our editors to refine your piece</li>
                    </ol>
                    <Link
                      href="/content-guidelines"
                      className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      View Content Guidelines
                    </Link>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                      For Developers
                    </h4>
                    <ol className="list-decimal pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                      <li>Visit our GitHub repository</li>
                      <li>Read the contribution guidelines</li>
                      <li>Set up your development environment</li>
                      <li>Submit your first pull request</li>
                    </ol>
                    <Link
                      href="https://github.com/utsab-adhikari/kalamkunja"
                      className="mt-4 inline-block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
                    >
                      Visit GitHub Repository
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  Join Our Community
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                  Connect with other contributors in our community forum, where
                  we discuss ideas, share progress, and support each other's
                  contributions.
                </p>
                <Link
                  href="/community-forum"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg hover:from-purple-700 hover:to-indigo-800 transition-colors duration-200 transform hover:-translate-y-0.5"
                >
                  Join Community Forum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
