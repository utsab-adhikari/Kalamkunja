import Link from "next/link";

// ✅ App Router metadata
export const metadata = {
  title: "Cookie Policy | Kalamkunja",
  description:
    "Understand how Kalamkunja uses cookies to enhance your browsing experience, including types of cookies, their purposes, and how to manage them.",
  keywords: [
    "Kalamkunja",
    "cookie policy",
    "cookies",
    "website tracking",
    "privacy",
    "data protection",
  ],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  alternates: {
    canonical: "https://Kalamkunja.com/cookie-policy",
  },
  charset: "utf-8", // Optional, not always necessary
};

export default function CookiePolicy() {
  const lastUpdatedDate = "August 14, 2025";

  return (
    <>
      <div className="">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Cookie Policy
              </h1>
              <p className="mt-2 text-blue-100 text-sm sm:text-base">
                Last updated: {lastUpdatedDate}
              </p>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="prose prose-blue max-w-none text-gray-700">
                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    1. What Are Cookies
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Cookies are small text files that are placed on your
                    computer or mobile device when you visit a website. They are
                    widely used to make websites work more efficiently, as well
                    as to provide information to the site owners.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Like most websites, Kalamkunja uses cookies to enhance your
                    experience, gather general visitor information, and track
                    visits to our website. Please refer to this policy for
                    information about what cookies are, which we use, how we use
                    them, and how you can control their use.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    2. How We Use Cookies
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    We use cookies for a variety of reasons, including:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>To enable certain functions of the website</li>
                    <li>To provide analytics on how you use our site</li>
                    <li>To store your preferences</li>
                    <li>To enable personalized content</li>
                    <li>To support social media features</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    3. Types of Cookies We Use
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                          >
                            Purpose
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                          >
                            Examples
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                            Essential
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                            Required for core functionality
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                            Authentication, security
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                            Performance
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                            Improve user experience
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                            Analytics, error reporting
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                            Functionality
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                            Remember preferences
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                            Language settings, region
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">
                            Advertising
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                            Deliver relevant ads
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                            Tracking, targeting
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    4. Third-Party Cookies
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    In addition to our own cookies, we may also use various
                    third-party cookies to report usage statistics of the
                    website, deliver advertisements on and through the website,
                    and so on.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    These cookies may be used by the following third parties:
                    Google Analytics, Facebook, Twitter, and advertising
                    partners. We do not control these third-party cookies and
                    their use is governed by the privacy policies of those third
                    parties.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    5. Controlling Cookies
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    You can control and/or delete cookies as you wish. You can
                    delete all cookies that are already on your computer and you
                    can set most browsers to prevent them from being placed.
                  </p>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    If you do this, however, you may have to manually adjust
                    some preferences every time you visit a site and some
                    services and functionalities may not work.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    To find out more about how to manage and delete cookies,
                    visit{" "}
                    <Link
                      href="https://www.aboutcookies.org"
                      className="text-blue-600 hover:underline"
                    >
                      aboutcookies.org
                    </Link>
                    .
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    If you have any questions about our Cookie Policy, please
                    contact us at{" "}
                    <Link
                      href="mailto:privacy@kalamkunja.com"
                      className="text-blue-600 hover:underline"
                    >
                      privacy@kalamkunja.com
                    </Link>
                    .
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
