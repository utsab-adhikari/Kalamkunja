import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Kalamkunja",
  description:
    "Learn how Kalamkunja collects, uses, and protects your personal information. Understand your privacy rights and how we ensure data security.",
  keywords: [
    "Kalamkunja",
    "privacy policy",
    "data protection",
    "personal information",
    "user privacy",
  ],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  alternates: {
    canonical: "https://Kalamkunja.com/privacy-policy",
  },
  charset: "utf-8", // optional, not required in modern setups
};

export default function PrivacyPolicy() {
  const lastUpdatedDate = "August 14, 2025";

  return (
    <>
      <div className="">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Privacy Policy
              </h1>
              <p className="mt-2 text-blue-100 text-sm sm:text-base">
                Last updated: {lastUpdatedDate}
              </p>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="prose prose-blue max-w-none text-gray-700">
                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    1. Introduction
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    At Kalamkunja, we are committed to protecting your personal
                    information and your right to privacy. This Privacy Policy
                    explains how we collect, use, and disclose your personal
                    information when you use our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    2. Information We Collect
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    We collect personal information that you voluntarily provide
                    to us when you register on our website, express an interest
                    in obtaining information about us or our services, or
                    otherwise when you contact us.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    The personal information we collect may include:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-2 text-sm sm:text-base">
                    <li>
                      Name and contact information (email, address, phone
                      number)
                    </li>
                    <li>Account credentials (username and password)</li>
                    <li>Payment information (for premium services)</li>
                    <li>Content you submit to our platform</li>
                    <li>
                      Technical data (IP address, browser type, device
                      information)
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    We use personal information collected via our services for a
                    variety of business purposes, including:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>To provide and operate our services</li>
                    <li>To manage your account and authenticate users</li>
                    <li>To send administrative information to you</li>
                    <li>To fulfill and manage your orders</li>
                    <li>To request feedback and improve our services</li>
                    <li>To protect against malicious or illegal activity</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    4. Sharing Your Information
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    We only share information with your consent, to comply with
                    laws, to provide you with services, to protect your rights,
                    or to fulfill business obligations.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    We may share your data with third-party vendors, service
                    providers, contractors, or agents who perform services for
                    us or on our behalf.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    5. Data Security
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    We have implemented appropriate technical and organizational
                    security measures designed to protect the security of any
                    personal information we process.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Despite our safeguards, no electronic transmission over the
                    Internet is 100% secure. We cannot guarantee the absolute
                    security of your information.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    6. Your Privacy Rights
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Depending on your location, you may have certain rights
                    regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>
                      The right to access and receive a copy of your personal
                      data
                    </li>
                    <li>
                      The right to request correction of inaccurate information
                    </li>
                    <li>The right to request deletion of your personal data</li>
                    <li>
                      The right to object to processing of your personal data
                    </li>
                    <li>The right to withdraw consent at any time</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    If you have questions or comments about this policy, you may
                    contact our Data Protection Officer at{" "}
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
