import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | Kalamkunja",
  description:
    "Read the Terms and Conditions for using Kalamkunja services. Understand your rights and responsibilities as a user of our platform.",
  keywords: [
    "Kalamkunja",
    "terms and conditions",
    "user agreement",
    "legal",
    "website terms",
  ],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  alternates: {
    canonical: "https://Kalamkunja.com/terms-and-conditions",
  },
  charset: "utf-8", // Optional, not required in metadata, modern browsers assume UTF-8
};

export default function TermsAndConditions() {
  const lastUpdatedDate = "August 14, 2025";

  return (
    <>
      <div className="">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Terms and Conditions
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
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Welcome to Kalamkunja! These Terms and Conditions govern your use
                    of our website located at{" "}
                    <Link
                      href="https://kalamkunja.com"
                      className="text-blue-600 hover:underline"
                    >
                      kalamkunja.com
                    </Link>{" "}
                    and any related services provided by Kalamkunja.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    By accessing or using our services, you agree to be bound by
                    these Terms. If you disagree with any part of these Terms,
                    you may not access our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    2. Intellectual Property Rights
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    The content on our platform, including text, graphics,
                    images, and software, is the property of Kalamkunja or its
                    content suppliers and protected by international copyright
                    laws.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    You may not reproduce, distribute, modify, create derivative
                    works of, publicly display, or in any way exploit any of the
                    content without express written permission.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    3. User Responsibilities
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    As a user of our services, you agree to:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
                    <li>
                      Provide accurate and complete registration information
                    </li>
                    <li>Maintain the security of your password and account</li>
                    <li>
                      Not engage in any illegal activities through our services
                    </li>
                    <li>
                      Not upload or transmit any viruses or malicious code
                    </li>
                    <li>Respect the intellectual property rights of others</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    4. Limitation of Liability
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Kalamkunja and its affiliates will not be liable for any
                    indirect, incidental, special, consequential, or punitive
                    damages resulting from your access to or use of, or
                    inability to access or use, our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    5. Changes to Terms
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    We reserve the right to modify these Terms at any time. We
                    will provide notice of any changes by posting the updated
                    Terms on our website. Your continued use of our services
                    after such changes constitutes your acceptance of the new
                    Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    If you have any questions about these Terms, please contact
                    us at{" "}
                    <Link
                      href="mailto:legal@Kalamkunja.com"
                      className="text-blue-600 hover:underline"
                    >
                      legal@kalamkunja.com
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
