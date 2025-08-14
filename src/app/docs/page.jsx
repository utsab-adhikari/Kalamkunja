"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "getting-started", title: "Getting Started" },
  { id: "content-creation", title: "Content Creation" },
  { id: "ai-studio", title: "AI Studio" },
  { id: "community", title: "Community" },
  { id: "developer-guide", title: "Developer Guide" },
  { id: "faq", title: "FAQ" },
  { id: "support", title: "Support" },
];

export default function DocsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0].id);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track active section for highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex bg-white dark:bg-neutral-900 min-h-screen">
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-15 h-full overflow-y-auto",
          "w-64 bg-neutral-50 dark:bg-neutral-800 border-r border-neutral-200",
          "dark:border-neutral-700 p-4 z-40 transition-transform duration-300",
          "h-full md:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
            Kalamkunja Docs
          </h2>
          <button
            className="md:hidden text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            onClick={() => setMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={cn(
                "block px-3 py-2 rounded-md transition-colors",
                "text-neutral-700 dark:text-neutral-300",
                "hover:bg-neutral-200 dark:hover:bg-neutral-700",
                activeSection === sec.id &&
                  "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
              )}
              onClick={() => setMenuOpen(false)}
            >
              {sec.title}
            </a>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Homepage
              </a>
            </li>
            <li>
              <a
                href="https://github.com/kalamkunja"
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <a
                href="/community"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Community Forum
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-20 left-4 z-30 p-2 bg-neutral-200 dark:bg-neutral-700 rounded-md shadow"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 mx-auto text-neutral-800 dark:text-neutral-200">
        {/* INTRODUCTION */}
        <section
          id="introduction"
          className="mb-16 min-h-[80vh] py-8 scroll-mt-20"
        >
          <h1 className="text-3xl font-bold mb-6">
            Introduction to Kalamkunja
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg">
              Kalamkunja is a Nepali-led global knowledge-sharing platform where
              creators can publish articles, tutorials, guides, and stories. We
              combine traditional content publishing with AI-powered tools to
              help writers and developers bring ideas to life faster.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p>
                  To democratize knowledge sharing by providing accessible tools
                  for creators worldwide, with special focus on supporting
                  Nepali language content and creators.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Multi-language support with Nepali-first approach</li>
                  <li>AI-assisted writing and content generation</li>
                  <li>Built-in image creation tools</li>
                  <li>Developer-friendly API access</li>
                  <li>Community collaboration features</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-lg">
            <img
              src="https://res.cloudinary.com/dnh6hzxuh/image/upload/v1755152921/cx5w6xs4jdyiuiccgi09.png"
              alt="Kalamkunja platform dashboard overview"
              className=""
            />
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 p-2">
              Fig 1.1: Kalamkunja platform dashboard interface
            </p>
          </div>
        </section>

        {/* GETTING STARTED */}
        <section
          id="getting-started"
          className="mb-16 min-h-[80vh] py-8 scroll-mt-20"
        >
          <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mt-6 mb-3">
              Account Creation
            </h3>
            <p>
              Start your journey with Kalamkunja by creating a free account. Our
              platform offers both free and premium subscription options.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold mb-2">Step-by-Step Guide</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Navigate to{" "}
                    <strong>
                      <Link className="text-blue-600" href={"/v1/auth/signup"}>
                        signup
                      </Link>
                    </strong>{" "}
                    page
                  </li>
                  <li>Fill in your name, email, and secure password</li>
                  <li>Agree to our terms and privacy policy</li>
                  <li>Click "Create Account"</li>
                  <li>Check your email for verification link</li>
                  <li>Complete your profile setup</li>
                  <li>or You can just continue with google</li>
                </ol>
              </div>

              <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
                <img
                  src="https://res.cloudinary.com/dnh6hzxuh/image/upload/v1755153958/v70i6v2sgxznybhoieoc.png"
                  alt="Signup process screenshot"
                  className="w-full"
                />
                <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 p-2">
                  Fig 2.1: Account signup interface
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              Login & Authentication
            </h3>
            <p>
              Access your account using your registered credentials. We support
              both email/password and OAuth providers for convenience. Navigate
              to{" "}
              <strong>
                <Link className="text-blue-600" href={"/v1/auth/login"}>
                  Login
                </Link>
              </strong>{" "}
              page
            </p>

            <div className="mt-4 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 max-w-2xl">
              <img
                src="https://res.cloudinary.com/dnh6hzxuh/image/upload/v1755153587/pxcxlpienjdveuxague8.png"
                alt="Login options screenshot"
                className="w-full"
              />
              <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 p-2">
                Fig 2.2: Multiple login options
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Security Tip
              </h4>
              <p className="mt-2 text-sm">
                Enable two-factor authentication in your account settings for
                enhanced security. We recommend using authenticator apps like
                Google Authenticator or Authy.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT CREATION */}
        <section
          id="content-creation"
          className="mb-16 min-h-[80vh] py-8 scroll-mt-20"
        >
          <h2 className="text-2xl font-semibold mb-6">Content Creation</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Kalamkunja provides a powerful yet intuitive editor for creating
              beautiful content. Our editor supports Markdown formatting and
              provides real-time preview.
            </p>

            <div className="mt-6 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow">
              <img
                src="/docs/editor-interface.png"
                alt="Content editor interface"
                className="w-full"
              />
              <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 p-2">
                Fig 3.1: Content editor with live preview
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">Editor Features</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-medium mb-1">Rich Formatting</h4>
                <p className="text-sm">
                  Headings, lists, code blocks, quotes, and custom HTML support
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Media Embedding</h4>
                <p className="text-sm">
                  Add images, videos, and interactive embeds from popular
                  platforms
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Version Control</h4>
                <p className="text-sm">
                  Automatic draft saving and revision history
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Collaboration</h4>
                <p className="text-sm">
                  Real-time co-authoring and commenting system
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">
              Publishing Workflow
            </h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Create new content from dashboard</li>
              <li>Add title and meta description</li>
              <li>Write content using our editor</li>
              <li>Add tags and categories</li>
              <li>Upload cover image (recommended 1200x630px)</li>
              <li>Set visibility (public, private, or unlisted)</li>
              <li>Schedule publication or publish immediately</li>
            </ol>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h4 className="font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Pro Tip
              </h4>
              <p className="mt-2 text-sm">
                Use our built-in SEO analyzer to optimize your content for
                search engines before publishing. Access it through the "SEO
                Tools" tab in the editor.
              </p>
            </div>
          </div>
        </section>

        {/* AI STUDIO */}
        <section
          id="ai-studio"
          className="mb-16 min-h-[80vh] py-8 scroll-mt-20"
        >
          <h2 className="text-2xl font-semibold mb-6">AI Studio</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Our AI-powered tools help you overcome writer's block, generate
              ideas, and enhance your content creation process.
            </p>

            <div className="mt-6 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
              <img
                src="/docs/ai-studio-dashboard.png"
                alt="AI Studio dashboard"
                className="w-full"
              />
              <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 p-2">
                Fig 4.1: AI Studio interface with tools selection
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  AI Writing Assistant
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Content expansion and summarization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Tone adjustment (formal, casual, persuasive)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Grammar and style checking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Multi-language translation support</span>
                  </li>
                </ul>

                <a
                  href="/ai/writing-guide"
                  className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Writing Assistant Documentation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  AI Image Generator
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Text-to-image generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Image style transfer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Resolution enhancement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Background removal</span>
                  </li>
                </ul>

                <a
                  href="/ai/image-guide"
                  className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Image Generator Documentation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITY */}
        <section
          id="community"
          className="mb-16 min-h-[80vh] py-8 scroll-mt-20"
        >
          <h2 className="text-2xl font-semibold mb-6">
            Community & Collaboration
          </h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Join our growing community of creators, developers, and knowledge
              enthusiasts. Collaborate, learn, and grow together.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Forums</h3>
                <p className="mt-2 text-sm">
                  Discuss ideas, ask questions, and share knowledge with other
                  community members.
                </p>
                <a
                  href="/community/forums"
                  className="mt-2 inline-block text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  Visit Forums →
                </a>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Feedback Hub</h3>
                <p className="mt-2 text-sm">
                  Suggest new features, report issues, and vote on upcoming
                  platform improvements.
                </p>
                <a
                  href="/community/feedback"
                  className="mt-2 inline-block text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  Give Feedback →
                </a>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Learning Resources</h3>
                <p className="mt-2 text-sm">
                  Tutorials, workshops, and community-created learning
                  materials.
                </p>
                <a
                  href="/community/learn"
                  className="mt-2 inline-block text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  Explore Resources →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DEVELOPER GUIDE */}
        <section
          id="developer-guide"
          className="mb-16 min-h-[80vh] py-8 scroll-mt-20"
        >
          <h2 className="text-2xl font-semibold mb-6">Developer Guide</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Extend and integrate Kalamkunja using our developer tools and
              APIs. Contribute to our open-source ecosystem.
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">
                Getting Started with API
              </h3>
              <p>
                Our REST API allows you to programmatically interact with the
                Kalamkunja platform. All API endpoints require authentication.
              </p>

              <div className="mt-4 rounded-lg bg-neutral-800 p-4">
                <pre className="text-sm text-green-400">
                  {`// Example: Creating content via API
const createArticle = async () => {
  const response =
   await fetch('apiurl/v1/content',
    {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'My First API Article',
      content: 'Content created via API call',
      status: 'draft',
      tags: ['api', 'tutorial']
    })
  });
  
  return await response.json();
};`}
                </pre>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">API Reference</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="/api/auth"
                        className="text-blue-400 hover:underline"
                      >
                        Authentication API
                      </a>
                    </li>
                    <li>
                      <a
                        href="/api/content"
                        className="text-blue-400 hover:underline"
                      >
                        Content Management API
                      </a>
                    </li>
                    <li>
                      <a
                        href="/api/users"
                        className="text-blue-400 hover:underline"
                      >
                        User Management API
                      </a>
                    </li>
                    <li>
                      <a
                        href="/api/ai"
                        className="text-blue-400 hover:underline"
                      >
                        AI Services API
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">SDKs & Libraries</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a
                        href="https://npmjs.com/package/kalamkunja-js"
                        className="text-blue-400 hover:underline"
                      >
                        JavaScript/Node.js SDK
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://pypi.org/project/kalamkunja-py"
                        className="text-blue-400 hover:underline"
                      >
                        Python SDK
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/kalamkunja/mobile-sdk"
                        className="text-blue-400 hover:underline"
                      >
                        Mobile SDK (iOS/Android)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Self-Hosting Guide</h3>
              <p>
                For enterprise users and developers, Kalamkunja can be
                self-hosted in your own infrastructure.
              </p>

              <div className="mt-4 rounded-lg bg-neutral-50 dark:bg-neutral-800 p-4">
                <h4 className="font-semibold mb-2">Docker Deployment</h4>
                <pre className="text-sm bg-black/20 p-3 rounded overflow-x-auto">
                  {`# Clone the repository
git clone 
https://github.com/kalamkunja

# Navigate to project directory
cd kalamkunja-selfhosted

# Copy environment variables
cp .env.example .env

# Update configuration
nano .env

# Start services
docker-compose up -d`}
                </pre>
              </div>

              <a
                href="https://github.com/kalamkunja/kalamkunja-selfhosted"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                View Self-Hosting Repository
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16 min-h-[80vh] py-8 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">
                  Is Kalamkunja free to use?
                </h3>
                <p className="mt-2">
                  Yes, Kalamkunja offers a free tier with basic features. We
                  also have premium plans that unlock advanced features like:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Unlimited AI image generation</li>
                  <li>Advanced content analytics</li>
                  <li>Custom domains</li>
                  <li>Priority support</li>
                  <li>Increased storage space</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  What languages does Kalamkunja support?
                </h3>
                <p className="mt-2">
                  We currently support content creation in English, Nepali,
                  Hindi, and Spanish. Our AI tools work best with English and
                  Nepali, with more languages coming soon.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  How does the AI content generation work?
                </h3>
                <p className="mt-2">
                  Our AI uses advanced language models trained on diverse
                  datasets. You provide a prompt or starting point, and the AI
                  generates relevant content. You maintain full ownership of all
                  content created on our platform.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Can I export my content from Kalamkunja?
                </h3>
                <p className="mt-2">
                  Absolutely. You can export your content in multiple formats:
                  Markdown, HTML, PDF, or Word documents. We also provide API
                  access for programmatic export.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  How do I report inappropriate content?
                </h3>
                <p className="mt-2">
                  Use the "Report" button on any content page or email us at
                  <a
                    href="mailto:trust@kalamkunja.com"
                    className="underline ml-1"
                  >
                    trust@kalamkunja.com
                  </a>
                  . We review all reports within 24 hours.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Have more questions?
              </h4>
              <p className="mt-2">
                Visit our{" "}
                <a
                  href="/community/faq"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Community FAQ section
                </a>{" "}
                or contact our support team.
              </p>
            </div>
          </div>
        </section>

        {/* SUPPORT */}
        <section id="support" className="mb-16 min-h-[50vh] py-8 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-6">Support</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Contact Options</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <strong>Email Support</strong>
                      <div className="mt-1">
                        <a
                          href="mailto:support@kalamkunja.com"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          support@kalamkunja.com
                        </a>
                        <p className="text-sm mt-1">
                          Typical response time: 24-48 hours
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <div>
                      <strong>Community Forum</strong>
                      <div className="mt-1">
                        <a
                          href="/community/support"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Visit Support Forum
                        </a>
                        <p className="text-sm mt-1">
                          Get help from community experts
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div>
                      <strong>Live Chat</strong>
                      <div className="mt-1">
                        <a
                          href="/support/chat"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Start Chat Session
                        </a>
                        <p className="text-sm mt-1">
                          Available Mon-Fri, 9AM-5PM (GMT+5:45)
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/docs/troubleshooting"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Troubleshooting Guide
                    </a>
                    <p className="text-sm mt-1">
                      Solutions for common technical issues
                    </p>
                  </li>

                  <li>
                    <a
                      href="/docs/video-tutorials"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Video Tutorials
                    </a>
                    <p className="text-sm mt-1">
                      Step-by-step video guides for all features
                    </p>
                  </li>

                  <li>
                    <a
                      href="/status"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      System Status
                    </a>
                    <p className="text-sm mt-1">
                      Check current platform status and uptime
                    </p>
                  </li>

                  <li>
                    <a
                      href="/docs/feature-requests"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Request a Feature
                    </a>
                    <p className="text-sm mt-1">
                      Suggest new features for our platform
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
