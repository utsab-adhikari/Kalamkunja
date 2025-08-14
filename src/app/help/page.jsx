import { FaQuestionCircle, FaSearch, FaBook, FaUserFriends, FaCog, FaComments } from 'react-icons/fa';

export const metadata = {
  title: 'Help Center | Kalamkunja',
  description: 'Find answers to common questions, troubleshooting guides, and support resources for Kalamkunja.',
  keywords: 'help, support, FAQ, troubleshooting, Kalamkunja, knowledge base',
};

export default function HelpCenter() {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button in the top navigation bar. You can sign up using your email address or through social providers like Google or GitHub."
    },
    {
      question: "How can I reset my password?",
      answer: "On the login page, click 'Forgot Password'. Enter your email address and we'll send you a password reset link."
    },
    {
      question: "How do I publish an article?",
      answer: "After logging in, navigate to your dashboard and click 'Create Article'. Fill in the required fields and choose 'Publish' when ready."
    },
    {
      question: "Can I edit my published articles?",
      answer: "Yes, you can edit your articles at any time. Go to your dashboard, find the article, and click 'Edit'."
    }
  ];

  const categories = [
    {
      icon: <FaBook className="text-2xl text-blue-600" />,
      title: "Knowledge Base",
      description: "Comprehensive guides and tutorials on using all Kalamkunja features"
    },
    {
      icon: <FaUserFriends className="text-2xl text-green-600" />,
      title: "Community Support",
      description: "Get help from our active community of users and experts"
    },
    {
      icon: <FaCog className="text-2xl text-purple-600" />,
      title: "Technical Support",
      description: "Troubleshoot technical issues with our detailed guides"
    },
    {
      icon: <FaComments className="text-2xl text-orange-600" />,
      title: "Contact Support",
      description: "Directly contact our support team for personalized assistance"
    }
  ];

  return (
    <div className="">
      <div className="mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full p-3 mb-6">
            <FaQuestionCircle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to your questions, troubleshoot issues, and get support for Kalamkunja.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search help articles, FAQs, and more..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
              <button className="absolute right-2.5 bottom-2.5 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((category, index) => (
            <div key={index} className="bg-white shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="ml-3 text-lg font-semibold text-gray-900">{category.title}</h3>
              </div>
              <p className="text-gray-600">{category.description}</p>
              <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Explore
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="bg-white shadow-md overflow-hidden mb-16">
          <div className="bg-gray-800 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Popular Help Articles</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition">
                <div className="bg-blue-100 text-blue-800 rounded-md p-2 mr-4">
                  <FaBook className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Getting Started with Kalamkunja</h3>
                  <p className="text-gray-600 mt-1">Learn how to set up your account and start publishing content</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition">
                <div className="bg-green-100 text-green-800 rounded-md p-2 mr-4">
                  <FaCog className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Customizing Your Profile</h3>
                  <p className="text-gray-600 mt-1">Personalize your profile to showcase your expertise</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition">
                <div className="bg-purple-100 text-purple-800 rounded-md p-2 mr-4">
                  <FaComments className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Managing Comments</h3>
                  <p className="text-gray-600 mt-1">Learn how to moderate and respond to comments on your articles</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                View All Articles
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-blue-50 p-6">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-2/3 mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Still need help?</h3>
                  <p className="text-gray-600">Our support team is ready to assist you with any questions.</p>
                </div>
                <div className="md:w-1/3 text-right">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}