
import { FaBalanceScale, FaCode, FaCreativeCommons, FaFileContract } from 'react-icons/fa';
import Link from 'next/link';

export const metadata = {
  title: "Licensing | Kalamkunja",
  description: "Learn about our licensing terms, open source policies, and content usage guidelines.",
  keywords: "licensing, terms, open source, content license, copyright, Kalamkunja",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
  alternates: {
    canonical: "https://Kalamkunja.com/licensing",
  },
};

export default function Licensing() {
  const licenses = [
    {
      icon: <FaCreativeCommons className="text-3xl text-blue-600" />,
      title: "Content License",
      description: "Our default content license for articles published on Kalamkunja",
      items: [
        "Creative Commons Attribution 4.0 International",
        "Allows sharing and adaptation with attribution",
        "Commercial use permitted",
      ],
    },
    {
      icon: <FaCode className="text-3xl text-green-600" />,
      title: "Open Source License",
      description: "License for our open source projects and contributions",
      items: [
        "MIT License for most projects",
        "Apache 2.0 for larger frameworks",
        "Contributions under the same license",
      ],
    },
    {
      icon: <FaFileContract className="text-3xl text-purple-600" />,
      title: "Enterprise License",
      description: "Commercial licensing options for businesses",
      items: [
        "Custom terms for commercial use",
        "White-label solutions",
        "Priority support and SLAs",
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="mx-auto py-10">
        {/* Hero Section */}
        <div className="text-center mb-12 p-5">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full p-3 mb-6">
            <FaBalanceScale className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Licensing Information
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Understand our licensing terms for content, software, and platform usage.
          </p>
        </div>

        {/* License Types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 p-4">
          {licenses.map((license, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">{license.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-center text-gray-800 mb-3">
                {license.title}
              </h3>
              <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
                {license.description}
              </p>
              <div className="space-y-3">
                {license.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="ml-3 text-gray-600 text-sm sm:text-base">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href={`/licensing/${license.title.toLowerCase().replace(" ", "-")}`}
                  className="inline-block px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Read Full License
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed License Info */}
        <div className="bg-white shadow-lg mb-12 mx-4">
          <div className="bg-gray-800 text-white px-4 sm:px-6 py-4">
            <h2 className="text-lg sm:text-xl font-semibold">Detailed Licensing Terms</h2>
          </div>
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="prose prose-blue max-w-none text-gray-700">
              <section className="mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  1. Content Licensing
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  By publishing content on Kalamkunja, you grant us a worldwide, non-exclusive, royalty-free license to use, distribute, reproduce, modify, adapt, publish, translate, publicly perform, and publicly display your content.
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  You retain ownership of your content and may choose the license under which it is shared with others. Our default license is Creative Commons Attribution 4.0 International (CC BY 4.0), but you may select alternative licenses when publishing.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  2. Software Licensing
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  The Kalamkunja platform is built using various open source technologies licensed under their respective terms. Our core platform source code is available under the MIT License, allowing free use, modification, and distribution.
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  When contributing to our open source projects, you agree to license your contributions under the same terms as the project you're contributing to. We require all contributors to sign our Contributor License Agreement (CLA).
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  3. Trademark Policy
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  The Kalamkunja name and logo are registered trademarks. You may not use these trademarks without our express written permission, except to accurately refer to our products or services. Any use must follow our{' '}
                  <Link href="/trademark-guidelines" className="text-blue-600 hover:underline">
                    trademark guidelines
                  </Link>.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  4. Third-Party Content
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Our platform may contain content from third parties. This content remains the property of its respective owners and is subject to their licensing terms. We make no claims of ownership over third-party content.
                </p>
              </section>

              <section>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  Contact Us
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  If you have questions about our licensing terms, please contact us at{' '}
                  <Link href="mailto:licensing@Kalamkunja.com" className="text-blue-600 hover:underline">
                    licensing@kalamkunja.com
                  </Link>.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* License Comparison */}
        <div className="">
          <div className="bg-gray-800 text-white px-4 sm:px-6 py-4 mx-4">
            <h2 className="text-lg sm:text-xl font-semibold">License Comparison</h2>
          </div>
          <div className="p-4 sm:p-6 lg:p-8">
            <table className="min-w-full  shadow-xl divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                    License Feature
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                    Creative Commons BY 4.0
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                    MIT License
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                    Commercial License
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">Commercial Use</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Allowed</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Allowed</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Allowed</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">Distribution</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Allowed with attribution</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Allowed</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Custom terms</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">Modification</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Allowed</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Allowed</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Custom terms</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">Attribution Required</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Yes</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Yes</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Optional</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">Warranty</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">None</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">None</td>
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}