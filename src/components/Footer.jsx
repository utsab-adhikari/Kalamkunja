import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <img
                src="https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png"
                alt=""
                className="bg-blue-300b h-30 w-40"
              />
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              Exploring the core of knowledge through insightful articles and
              expert perspectives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                ["Home", "/"],
                ["Articles", "/v1/articles"],
                ["Categories", "/v1/category"],
                ["About Us", "/about"],
              ].map(([title, url]) => (
                <li key={title}>
                  <Link
                    href={url}
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                ["Project Overview", "/about-project"],
                ["Help Center", "/help"],
                ["Community", "/community"],
                ["Contribute", "/contribute"],
              ].map(([title, url]) => (
                <li key={title}>
                  <Link
                    href={url}
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                ["Terms of Service", "/terms"],
                ["Privacy Policy", "/privacy"],
                ["Cookie Policy", "/cookies"],
                ["Licensing", "/licensing"],
              ].map(([title, url]) => (
                <li key={title}>
                  <Link
                    href={url}
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Kalamkunja. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {["Twitter", "Facebook", "LinkedIn", "Instagram"].map(
              (platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-gray-400 hover:text-blue-600"
                  aria-label={platform}
                >
                  <span className="sr-only">{platform}</span>
                  <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center">
                    {platform.charAt(0)}
                  </div>
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
