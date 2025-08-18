import Link from "next/link";
import { FaCheckCircle, FaBan, FaPenFancy, FaClipboardList } from "react-icons/fa";

export const metadata = {
  title: "Content Guidelines | Kalamkunja",
  description:
    "Learn the content guidelines for contributing to Kalamkunja. Ensure your submissions meet our quality, originality, and community standards.",
  keywords: [
    "Kalamkunja",
    "content guidelines",
    "submission rules",
    "writing standards",
    "community guidelines",
  ],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  alternates: {
    canonical: "https://Kalamkunja.com/content-guidelines",
  },
  charset: "utf-8",
};

export default function ContentGuidelines() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Kalamkunja Content Guidelines
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          These guidelines help maintain quality, originality, and respect in all content 
          published on Kalamkunja. Please review before submitting your work.
        </p>
      </div>

      {/* Section: General Principles */}
      <div className="bg-white shadow-lg p-6 mb-10">
        <div className="flex items-center mb-4">
          <FaCheckCircle className="text-green-600 text-xl mr-3" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            General Principles
          </h2>
        </div>
        <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
          <li>All submissions must be your original work or properly attributed with permission.</li>
          <li>Write with clarity, accuracy, and respect for our diverse audience.</li>
          <li>Content should provide value — educate, inspire, or inform readers.</li>
          <li>Follow proper grammar, spelling, and formatting standards.</li>
        </ul>
      </div>

      {/* Section: Writing Style */}
      <div className="bg-blue-50 p-6 mb-10">
        <div className="flex items-center mb-4">
          <FaPenFancy className="text-blue-600 text-xl mr-3" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Writing Style
          </h2>
        </div>
        <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
          <li>Use clear, simple language; avoid unnecessary jargon.</li>
          <li>Organize content with headings, subheadings, and bullet points.</li>
          <li>Support claims with credible sources and provide references/links.</li>
          <li>Include visuals (images, diagrams, code snippets) when helpful.</li>
        </ul>
      </div>

      {/* Section: Prohibited Content */}
      <div className="bg-red-50 p-6 mb-10">
        <div className="flex items-center mb-4">
          <FaBan className="text-red-600 text-xl mr-3" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Prohibited Content
          </h2>
        </div>
        <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
          <li>Plagiarism or uncredited use of others’ work.</li>
          <li>Hate speech, discrimination, or personal attacks.</li>
          <li>False or misleading information.</li>
          <li>Promotional or spam content unrelated to Kalamkunja’s mission.</li>
        </ul>
      </div>

      {/* Section: Submission Process */}
      <div className="bg-yellow-50 p-6 mb-10">
        <div className="flex items-center mb-4">
          <FaClipboardList className="text-yellow-600 text-xl mr-3" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Submission Process
          </h2>
        </div>
        <ol className="list-decimal pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
          <li>Create an account or log in to Kalamkunja.</li>
          <li>Prepare your draft following the above guidelines.</li>
          <li>Submit your article via the contributor dashboard.</li>
          <li>Our editorial team will review and provide feedback if needed.</li>
          <li>Approved content will be published with proper credit to you.</li>
        </ol>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/v1/articles/create"
          className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-blue-700 rounded-lg text-white hover:from-green-700 hover:to-blue-800 transition-colors duration-200 transform hover:-translate-y-0.5"
        >
          Start Contributing
        </Link>
      </div>
    </div>
  );
}
